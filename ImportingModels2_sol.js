var renderer = null;
var scene = null;
var camera = null;
var camera1;
var camera1Ativada = true;
var camera2 = null;
var count = 0;

var loader;
var ceu;
var ceu1;
var canhao;
var cCanhao;
var mar;
var cCanhaof;
var ilha, ilha2, ilha3;
var barril, barril2, barril3;
var eixo;
var eixo2;
var direcao = 0;
var rotacao = 0;
var barco;
var velocidade = 4; //velocidade do barco
var mesh;
var arvore = 0
var arvore1;
var obstaculos = [];
var AI;
var barcoAfundado
var mar2;
var barrilArray = [];
var tubarao;
var tesouro;
var coinmap;
var home = [];
var ondinhas = [];
var polvodisparo;
var polvo = [];
var disparo;


window.onload = function init() {

    // Create the Three.js renderer
    renderer = new THREE.WebGLRenderer();
    // Set the viewport 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf7d9aa);
    document.body.appendChild(renderer.domElement);

    // Create a new Three.js scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 1, 11000);
    /*Luz */
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    /* CAMARA */
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.z = 2000;
    camera.position.y = 1000;
    scene.add(camera);




    camera2 = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.3, 5500);

    scene.add(camera2);


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * */

    /* SONS DO JOGO */
    // som  sea of thieves
    var listener = new THREE.AudioListener();
    camera.add(listener);

    // create the PositionalAudio object (passing in the listener)
    var sound = new THREE.PositionalAudio(listener);
    // load a sound and set it as the PositionalAudio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('sound/seaofthieves.ogg', function (buffer) {
        sound.setBuffer(buffer);
        sound.setRefDistance(500);
        sound.play();
    });

    // create an object for the sound to play from
    var sphere = new THREE.SphereGeometry(30, 32, 16);
    var materialSound = new THREE.MeshPhongMaterial({ color: 0xff2200 });
    var som = new THREE.Mesh(sphere, materialSound);
    som.position.y = -1000
    scene.add(som);
    // finally add the sound
    som.add(sound);
    // som  mar
    var listener1 = new THREE.AudioListener();
    camera.add(listener1);

    // create the PositionalAudio object (passing in the listener)
    var sound1 = new THREE.PositionalAudio(listener1);
    // load a sound and set it as the PositionalAudio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('sound/seasound.ogg', function (buffer) {
        sound1.setBuffer(buffer);
        sound1.setRefDistance(5000);
        sound1.play();
    });
    // create an object for the sound to play from
    var sphere1 = new THREE.SphereGeometry(30, 32, 16);
    var materialSound1 = new THREE.MeshPhongMaterial({ color: 0xff2200 });
    var som1 = new THREE.Mesh(sphere1, materialSound1);
    som1.position.y = -100
    scene.add(som1);
    // finally add the sound
    som1.add(sound1);

    /* * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * */



    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });
    controls.maxPolarAngle = ((Math.PI / 2));


    //mar
    var texture = new THREE.TextureLoader().load('models/mar.jpg');
    var textureBump = new THREE.TextureLoader().load('models/marBump.jpg');
    textureBump.bumpScale = 0.1;
    var geometry = new THREE.CircleGeometry(10000, 10000, 10000);
    var material = new THREE.MeshPhongMaterial({ wireframe: false, transparent: true, opacity: 0.5, side: THREE.BackSide, map: texture });
    mar = new THREE.Mesh(geometry, material);
    mar.rotation.x = Math.PI / 2;
    scene.add(mar);


    // mar2
    var geometryMar = new THREE.CircleGeometry(10000, 10000, 10000);
    var materialMar = new THREE.MeshPhongMaterial({ wireframe: false, transparent: true, opacity: 0.8, side: THREE.BackSide, map: texture });
    mar2 = new THREE.Mesh(geometryMar, materialMar);
    mar2.position.y = -10;
    mar2.rotation.x = Math.PI / 2;
    scene.add(mar2);



    /*        ONDAS      */
    for (i = 0; i <= 10; i++) {
        var ondas = new THREE.Object3D();  // precisa de array
        var texture0 = new THREE.TextureLoader().load('models/mar.jpg');
        var geometry0 = new THREE.CylinderGeometry(1500, 1500, 10000, 65, 50);
        geometry0.rotateX(-Math.PI / 2);
        var material0 = new THREE.MeshPhongMaterial({
            map: texture0,   // cor do mar
            transparent: true,
            opacity: .6,
            shading: THREE.FlatShading,
        });
        onda = new THREE.Mesh(geometry0, material0);
        // aLlow the sea to receive shadows
        onda.receiveShadow = true;
        console.log("Sea created")
        scene.add(onda);
        ondinhas.push(onda);
    }

    /* * * * * * * * *  * * * * * *  * * * * * * */




    function createObstaculos() {
        //ilha 
        var textureIlha = new THREE.TextureLoader().load('models/ilha.jpg');
        var textureIlhaBump = new THREE.TextureLoader().load('models/ilha.jpg')
        var geometry5 = new THREE.SphereGeometry(200, 20);
        var material5 = new THREE.MeshPhongMaterial({ wireframe: false, map: textureIlha, bumpMap: textureIlhaBump });
        ilha = new THREE.Mesh(geometry5, material5);
        ilha.name = "ilha"
        ilha.position.y = -50;
        ilha.position.x = 1000;
        ilha.rotation.x = Math.PI / 2;
        scene.add(ilha);

        obstaculos.push(ilha);



        //ilha2

        var geometry6 = new THREE.SphereGeometry(500, 40);
        var material6 = new THREE.MeshPhongMaterial({ wireframe: false, map: textureIlha });
        ilha2 = new THREE.Mesh(geometry6, material6);
        ilha2.position.y = -250;
        ilha2.position.x = -1000;
        ilha2.position.z = -1300;
        ilha2.name = "ilha2"
        ilha2.rotation.x = Math.PI / 2;
        scene.add(ilha2);

        obstaculos.push(ilha2);

        var geometry7 = new THREE.SphereGeometry(4000, 40);
        var material7 = new THREE.MeshPhongMaterial({ wireframe: false, map: textureIlha });
        ilha3 = new THREE.Mesh(geometry7, material7);
        ilha3.position.y = -2000;
        ilha3.position.x = 1000;
        ilha3.position.z = -9000;
        ilha3.name = "ilha3"
        scene.add(ilha3);

        obstaculos.push(ilha3);

    }

    // cria o porto 
    function createHome() {

        var geometry01 = new THREE.BoxGeometry(1000, 1000, 3000);
        var material01 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/traca.png'), side: THREE.DoubleSide });
        var atraca = new THREE.Mesh(geometry01, material01);
        atraca.position.y = -400;
        atraca.position.x = 1000;
        atraca.position.z = -4600;

        atraca.rotation.z = Math.PI / 2


        scene.add(atraca);

        home.push(atraca);

    }


    function createBarril() {


        textureBarril = new THREE.TextureLoader().load('models/barril.jpg')
        var geometry = new THREE.CylinderGeometry(30, 30, 60, 20);
        var material = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: false, map: textureBarril })
        barril = new THREE.Mesh(geometry, material);
        barril.position.x = -1000;
        barril.position.y = 10;
        barril.position.z = 380;
        barril.rotation.x = 300;
        barril.rotation.z = 100;

        scene.add(barril)

        barrilArray.push(barril);

        var geometry5 = new THREE.CylinderGeometry(30, 30, 60, 20);
        var material5 = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: false, map: textureBarril })
        barril2 = new THREE.Mesh(geometry5, material5);
        barril2.position.x = -1000;
        barril2.position.y = 10;
        barril2.position.z = 500;
        barril2.rotation.x = 300;
        barril2.rotation.z = 500;

        scene.add(barril2)

        barrilArray.push(barril2);

        var geometry6 = new THREE.CylinderGeometry(30, 30, 60, 20);
        var material6 = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: false, map: textureBarril })
        barril3 = new THREE.Mesh(geometry6, material6);
        barril3.position.x = -900;
        barril3.position.y = 10;
        barril3.position.z = 600;
        barril3.rotation.x = 300;
        barril3.rotation.z = 300;

        scene.add(barril3);

        barrilArray.push(barril3);



    }



    eixo = new THREE.Object3D;

    scene.add(eixo);

    //barco
    var textureLoader = new THREE.TextureLoader();
    var loader = new THREE.OBJLoader();
    loader.load('./models/chair.obj', function (mesh) {
        barco = mesh;
        var imageURL = "./models/wood-floor.jpg";
        textureLoader.load(imageURL, function (texture) {

            //Go through all children of the loaded object and search for a Mesh
            barco.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });

            barco.scale.set(0.25, 0.25, 0.25)
            barco.position.x = 300
            barco.rotation.x = 300
            //Add the 3D object in the scene
            scene.add(barco);

            // Render the scene
            renderer.render(scene, camera);
            barco.position.z = 5;
            barco.position.x = 12;
            eixo.add(barco)


            //canhao
            var texture = new THREE.TextureLoader().load('./models/wood-floor.jpg');
            var geometry = new THREE.CylinderGeometry(20, 20, 300, 20);
            var material = new THREE.MeshBasicMaterial({ color: 0x7D7D7D, wireframe: false, map: texture })
            canhao = new THREE.Mesh(geometry, material);
            canhao.position.x = -350;
            canhao.position.y = -300;
            canhao.position.z = 380;
            canhao.rotation.z = 300;





            barco.add(canhao);



            var geometry = new THREE.BoxGeometry(100, 120, 100);
            var material = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: false, map: texture })
            cCanhao = new THREE.Mesh(geometry, material);
            cCanhao.position.x = -200;
            cCanhao.position.y = -300;
            cCanhao.position.z = 330;
            cCanhao.rotation.z = 300;

            barco.add(cCanhao)




            var geometry = new THREE.CylinderGeometry(25, 25, 50, 20);
            var material = new THREE.MeshBasicMaterial({ color: 'white', wireframe: false, map: texture })
            cCanhaof = new THREE.Mesh(geometry, material);
            cCanhaof.position.x = -480;
            cCanhaof.position.y = -300;
            cCanhaof.position.z = 380;
            cCanhaof.rotation.z = 300;

            barco.add(cCanhaof)

        })
    })


    // casinha 

    var geometry90 = new THREE.BoxGeometry(3000, 1000, 3000);
    var cubeMaterials =
        [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/madeira1.jpg'), side: THREE.DoubleSide }),  // direita
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/madeira1.jpg'), side: THREE.DoubleSide }),   // esquerda
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/madeira1.jpg'), side: THREE.DoubleSide }),  // cima
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/madeira1.jpg'), side: THREE.DoubleSide }), // baixo
            // new THREE.MeshBasicMaterial({map : new THREE.TextureLoader().load('models/madeira1.jpg'), side : THREE.DoubleSide}),// frente
            // new THREE.MeshBasicMaterial({map : new THREE.TextureLoader().load('models/madeira1.jpg'), side : THREE.DoubleSide})



        ];

    var material90 = new THREE.MeshFaceMaterial(cubeMaterials);
    var casa = new THREE.Mesh(geometry90, material90);
    casa.position.y = 1900;
    casa.position.x = 900;
    casa.position.z = -9200;
    scene.add(casa);

    // porto para atracar inicio





    var geometry02 = new THREE.CylinderGeometry(70, 70, 3000);
    var material02 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/traca.png'), side: THREE.DoubleSide });
    var estaca = new THREE.Mesh(geometry02, material02);
    estaca.position.y = -1100;
    estaca.position.x = 1540;
    estaca.position.z = -4600;

    //estaca.rotation.z = Math.PI / 2


    scene.add(estaca);


    var geometry03 = new THREE.CylinderGeometry(70, 70, 3000);
    var material03 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/traca.png'), side: THREE.DoubleSide });
    var estaca1 = new THREE.Mesh(geometry03, material03);
    estaca1.position.y = -1100;
    estaca1.position.x = 470;
    estaca1.position.z = -4600;

    //estaca.rotation.z = Math.PI / 2


    scene.add(estaca1);




    var geometry04 = new THREE.CylinderGeometry(70, 70, 3000);
    var material04 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/traca.png'), side: THREE.DoubleSide });
    var estaca2 = new THREE.Mesh(geometry04, material04);
    estaca2.position.y = -1100;
    estaca2.position.x = 470;
    estaca2.position.z = -3400;

    //estaca.rotation.z = Math.PI / 2


    scene.add(estaca2);



    var geometry05 = new THREE.CylinderGeometry(70, 70, 3000);
    var material05 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('models/traca.png'), side: THREE.DoubleSide });
    var estaca5 = new THREE.Mesh(geometry05, material05);
    estaca5.position.y = -1100;
    estaca5.position.x = 1540;
    estaca5.position.z = -3400;

    //estaca.rotation.z = Math.PI / 2


    scene.add(estaca5);

    // porto para atracar fim


    var textureLoader1 = new THREE.TextureLoader()
    var loader1 = new THREE.OBJLoader();
    loader1.load('./models/Tree low.obj', function (mesh) {
        arvore = mesh;

        var imageURL2 = "./models/arvore.jpg";
        textureLoader.load(imageURL2, function (texture1) {

            //Go through all children of the loaded object and search for a Mesh
            arvore.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture1;
                };
            });




            console.log("texture loaded")
            //Go through all children of the loaded object and search for a Mesh


            arvore.scale.set(3, 3, 3)
            arvore.position.x = 1000
            arvore.position.y = 100;
            arvore.name = "tree";



            //Add the 3D object in the scene
            scene.add(arvore);
            // Render the scene
            renderer.render(scene, camera);


        });
    });

    var textureLoader2 = new THREE.TextureLoader()
    var loader2 = new THREE.OBJLoader();
    loader2.load('./models/Tree low.obj', function (mesh1) {
        arvore1 = mesh1;

        var imageURL2 = "./models/arvore.jpg";
        textureLoader2.load(imageURL2, function (texture2) {

            //Go through all children of the loaded object and search for a Mesh
            arvore1.traverse(function (child1) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child1 instanceof THREE.Mesh) {
                    child1.material.map = texture2;
                };
            });



            arvore1.scale.set(5, 6, 5)
            arvore1.position.x = -1000
            arvore1.position.y = 200;
            arvore1.position.z = -1300;



            //Add the 3D object in the scene
            scene.add(arvore1);
            // Render the scene
            renderer.render(scene, camera);


        });
    });

    var textureLoader1 = new THREE.TextureLoader()
    var loader1 = new THREE.OBJLoader();
    loader1.load('./models/barcoafundado.obj', function (mesh) {
        barcoAfundado = mesh;

        var imageURL2 = "./models/wood-floor.jpg";
        textureLoader.load(imageURL2, function (textureLoader1) {

            //Go through all children of the loaded object and search for a Mesh
            barcoAfundado.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = textureLoader1;
                };
            });




            console.log("texture loaded")
            //Go through all children of the loaded object and search for a Mesh


            barcoAfundado.scale.set(0.3, 0.3, 0.3)
            barcoAfundado.position.x = 1000
            barcoAfundado.position.y = -800;
            barcoAfundado.position.z = -1800;


            barcoAfundado.name = "tree";


            //Add the 3D object in the scene
            scene.add(barcoAfundado);
            // Render the scene
            renderer.render(scene, camera);


        });
    });


    eixo2 = new THREE.Object3D;
    scene.add(eixo2);
    //tubarao
    var textureTubarao = new THREE.TextureLoader()
    var loaderTubarao = new THREE.OBJLoader();
    loaderTubarao.load('./models/shark.obj', function (mesh) {
        tubarao = mesh;

        var imageURLtubarao = "./models/arvore.jpg";
        textureLoader.load(imageURLtubarao, function (texture) {

            //Go through all children of the loaded object and search for a Mesh
            tubarao.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                };
            });




            console.log("texture loaded")
            //Go through all children of the loaded object and search for a Mesh


            tubarao.name = "Tubarao";
            tubarao.scale.set(80, 70, 70)

            tubarao.position.y = -235;

            //Add the 3D object in the scene
            scene.add(tubarao);
            eixo2.add(tubarao);

            obstaculos.push(tubarao);
            // Render the scene
            renderer.render(scene, camera);


        });
    });
    //tesouro
    var textureTesouro = new THREE.TextureLoader()
    var loaderTesouro = new THREE.OBJLoader();
    loaderTesouro.load('./models/tesouro.obj', function (mesh) {
        tesouro = mesh;

        var imageURLtesouro = "./models/arvore.jpg";
        textureTesouro.load(imageURLtesouro, function (texture) {

            //Go through all children of the loaded object and search for a Mesh
            tesouro.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                };
            });




            console.log("texture loaded")
            //Go through all children of the loaded object and search for a Mesh


            tesouro.name = "Tesouro";
            tesouro.scale.set(23, 23, 23)
            tesouro.rotation.y = 800;
            tesouro.position.y = 195;
            tesouro.position.x = -1000;
            tesouro.position.z = -1150;

            //Add the 3D object in the scene
            scene.add(tesouro);

            // Render the scene
            renderer.render(scene, camera);


        });
    });

    //coinmap
    var textureCoin = new THREE.TextureLoader()
    var loaderCoin = new THREE.OBJLoader();
    loaderCoin.load('./models/coinmap.obj', function (mesh) {
        coin = mesh;

        var imageURLcoin = "./models/arvore.jpg";
        textureCoin.load(imageURLcoin, function (texture) {

            //Go through all children of the loaded object and search for a Mesh
            coin.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                };
            });




            console.log("texture loaded")
            //Go through all children of the loaded object and search for a Mesh


            coin.name = "Tesouro";
            coin.scale.set(300, 300, 300)

            coin.position.y = 215;
            coin.position.x = -1000;
            coin.position.z = -1150;

            //Add the 3D object in the scene
            scene.add(coin);

            // Render the scene
            renderer.render(scene, camera);


        });

    });




    // pirata


    var piratinha = new THREE.TextureLoader()
    var loaderPirata = new THREE.OBJLoader();
    loaderPirata.load('./models/Pirate.obj', function (mesh) {
        pirate = mesh;

        pirate.name = "Pirata";
        pirate.scale.set(50, 50, 50)


        pirate.position.y = 100;
        pirate.position.x = 1000;
        pirate.position.z = -4600;


        //Add the 3D object in the scene
        //scene.add(pirate);

        // Render the scene
        renderer.render(scene, camera);



    });




    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    animate();
    createObstaculos();
    createHome();
    createBarril();
    addAI();
}
/* * * * * * * * * * * * * * * * * * * * * * */
/* Movimentos*/
document.onkeydown = function handleKeyDown(event) {

    var key = String.fromCharCode(event.keyCode);

    if (key == "W") {
        direcao = -1;
    }
    if (key == "D") {
        rotacao = 1;
    }
    if (key == "A") {
        rotacao = -1;
    }

    if (key == "X") {
        console.log("bullet")
        createBullet();
    }

    // cameras
    if (key == "1") {
        console.log(key)
        camera1Ativada = true;
    }
    else if (key == "2") {
        console.log(key)
        camera1Ativada = false
    }


}
document.onkeyup = function handleKeyDown(event) {

    var key = String.fromCharCode(event.keyCode);
    // velocidade = 0;
    if (key == "W") {
        direcao = 0;
    }
    if (key == "D") {
        rotacao = 0;
    }
    if (key == "A") {
        rotacao = 0;
    }
    if (key == "X") {
        bala = false
    }

}

/* * * * * * * * * * * * * * * * * * * * * * */
function colisao() {
    var box = new THREE.Box3().setFromObject(barco);
    for (var i = 0; i < obstaculos.length; i++) {
        var objetos = new THREE.Box3().setFromObject(obstaculos[i]);
        var colisao = box.intersectsBox(objetos);
        if (obstaculos[0] || obstaculos[1] || obstaculos[2]) {
            if (colisao == true) {
                alert("Perdeste" + "Acabaste com :" + " " + Math.round(count/3)+ " " + "Pontos!")
                location.reload();
                return true;
            }
        }
    }
    return false;
}



// chegada ao porto
function colisaoHome() {

    var box1 = new THREE.Box3().setFromObject(barco);


    for (var i = 0; i < home.length; i++) {

        var objetos1 = new THREE.Box3().setFromObject(home[i]);

        var colisao1 = box1.intersectsBox(objetos1);

        if (colisao1 == true) {
            alert("Bem vindos piratas!")
            scene.add(pirate);

            pirate.position.z -= 8;


            return true;

        }


    }
    return false;



}

// colide com barris para irem para baixo
function barrilzinho() {

    var box2 = new THREE.Box3().setFromObject(barco);


    for (var i = 0; i < barrilArray.length; i++) {

        var objetos2 = new THREE.Box3().setFromObject(barrilArray[i]);

        var colisao2 = box2.intersectsBox(objetos2);

        if (colisao2 == true) {

            // quando bate os barris vao para baixo
            barrilArray[i].position.y -= 3;



            return true;

        }


    }
    return false;

}



function getRandBetween(lo, hi) {
    return parseInt(Math.floor(Math.random() * (hi - lo + 1)) + lo, 10);
}


//  var AIDirecao = 1
var t = 0;

var barrilDirecao = 1;
function animate() {



    for (i = 0; i < ondinhas.length; i++) {

        ondinhas.splice()
        ondinhas[0].position.x = -2500;
        ondinhas[1].position.x = -1500;
        ondinhas[2].position.x = -500;
        ondinhas[3].position.x = 200;
        ondinhas[4].position.x = 900;
        ondinhas[5].position.x = -900;
        ondinhas[6].position.x = -200;
        ondinhas[7].position.x = -500;
        ondinhas[8].position.x = 1500;
        ondinhas[9].position.x = 2500;
        ondinhas[i].position.y = -1485;
        ondinhas[0].position.x += -9;
        ondinhas[1].position.x += -9;
        ondinhas[2].position.x += -9;
        ondinhas[3].position.x += -9;
        ondinhas[4].position.x += -9;
        ondinhas[5].position.x += -9;
        ondinhas[6].position.x += -9;
        ondinhas[7].position.x += -9;
        ondinhas[8].position.x += -9;
        ondinhas[9].position.x += -9;
        ondinhas[i].rotation.z += 0.003;
    }
    for (i = 0; i < barrilArray.length; i++) {
        barrilArray[i].position.y += barrilDirecao * 0.1;
        if (barrilArray[i].position.y >= 1) {
            barrilDirecao = -1
        }
        if (barrilArray[i].position.y <= -1) {
            barrilDirecao = 1;
        }
    }

    // tubarao
    t += 0.001;
    eixo2.position.x = 1500 * Math.cos(t) + 0;
    eixo2.position.z = 1000 * Math.sin(t) + 0;
    eixo2.rotation.y -= 0.0008

    /* * * * * * * * * * * * * * * * * * * * */


    /*   barco     */
    var ultRotEixo = eixo.rotation.y;
    var ultPosEixo = eixo.position.clone();
    if (rotacao == 1) {
        eixo.rotation.y -= 0.052;
        if (colisao()) {
            eixo.rotation.y = ultRotEixo;

        }
    }
    else if (rotacao == -1) {
        eixo.rotation.y += 0.052
        if (colisao()) {
            eixo.rotation.y = ultRotEixo;

        }


    }

    if (direcao == 1) {
        eixo.position.z -= velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x -= velocidade * Math.sin(eixo.rotation.y);
        if (colisao()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;

        }
    }
    else if (direcao == -1) {
        eixo.position.z += velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x += velocidade * Math.sin(eixo.rotation.y);
        if (colisao()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;

        }
    }

    /*COLISÃO */

    if (rotacao == 1) {
        eixo.rotation.y -= 0.08

        if (colisaoHome()) {
            eixo.rotation.y = ultRotEixo;
        }
    }
    else if (rotacao == -1) {
        eixo.rotation.y += 0.08
        if (colisaoHome()) {
            eixo.rotation.y = ultRotEixo;
        }
    }

    if (direcao == 1) {
        eixo.position.z -= velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x -= velocidade * Math.sin(eixo.rotation.y);
        if (colisaoHome()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;
        }
    }
    else if (direcao == -1) {
        eixo.position.z += velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x += velocidade * Math.sin(eixo.rotation.y);
        if (colisaoHome()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;
        }
    }

    /*     Barril      */
    // colide com barril
    if (rotacao == 1) {
        eixo.rotation.y -= 0.08

        if (barrilzinho()) {
            eixo.rotation.y = ultRotEixo;
        }
    }
    else if (rotacao == -1) {
        eixo.rotation.y += 0.08
        if (barrilzinho()) {
            eixo.rotation.y = ultRotEixo;
        }
    }

    if (direcao == 1) {
        eixo.position.z -= velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x -= velocidade * Math.sin(eixo.rotation.y);
        if (barrilzinho()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;
        }
    }
    else if (direcao == -1) {
        eixo.position.z += velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x += velocidade * Math.sin(eixo.rotation.y);
        if (barrilzinho()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;
        }
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * */

    if (barco) {
        if (camera1Ativada == true) {
            // var relativeOffset = new THREE.Vector3(-2, 15, 63);
            // // updates (multiplies) the offset with the object's global transformation matrix
            // var cameraOffset = relativeOffset.applyMatrix4(scene.matrixWorld);

            // camera.position.copy(cameraOffset);

            // // camera looks at the object's position
            // //camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }



        else {
            var relativeOffset = new THREE.Vector3(-80, 450, -260);
            // updates (multiplies) the offset with the object's global transformation matrix
            var cameraOffset = relativeOffset.applyMatrix4(eixo.matrixWorld);

            camera2.position.copy(cameraOffset);

            // camera looks at the object's position
            camera2.lookAt(eixo.position);
            renderer.render(scene, camera2);
        }






    }








    /* DISPAROS */
    if (disparo == true) {
        for (var i = 0; i < balas.length; i++) {
            //update buller position (make it move)
            var n = balas[i].direcao.clone();
            balas[i].position.addVectors(balas[i].position.clone(), n.multiplyScalar(balas[i].inc));
            balas[i].inc += 2;
            if (polvoDie()) {
                console.log("ACERTOU ACERTOU")
                if (count % 3 === 0) {
                    for (var x = 0; x < polvo.length; x++) {
                        scene.remove(polvo[i])
                        polvo.splice(i, 1)
                        addAI()
                    }

                }
            }
        }
    }

    if (polvodisparo == true) {
        polvodie()
        for (var p = 0; p <= 2; p++) {
            addAi()
        }
    }
    /* * * * * * * * * * * * * * * * * *  *  */
    renderer.render(scene, camera1);
    requestAnimationFrame(animate)

}


/* ADD AI */
function addAI() {
    /* * * * * * * * * * POLVO* * * * * * * *  */
    var textureLoader = new THREE.TextureLoader();
    var loader = new THREE.OBJLoader();
    loader.load('./models/squid.obj', function (mesh) {
        AI = mesh;
        var imageURL = "./models/arvore.jpg";
        textureLoader.load(imageURL, function (texture) {
            console.log("tugboat")
            //Go through all children of the loaded object and search for a Mesh
            AI.traverse(function (child) {
                //This allow us to check if the children is an instance of the Mesh constructor
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });

            AI.scale.set(400, 400, 400)
            AI.position.y = 0;
            AI.position.x = Math.random() * -3000;
            AI.position.z = Math.random() * -3000;
            AI.rotation.y = Math.random() * 3000;
            //Add the 3D object in the scene
            scene.add(AI);
            polvo.push(AI);
            // Render the scene
            renderer.render(scene, camera);
        });
    });

}



// AI.scale.set(400, 400, 400)
// AI.position.y = 0;
// AI.position.x = Math.random() * -3000;
// AI.position.z = Math.random() * -3000;
// AI.rotation.y = Math.random() * 3000;


/* * * * * * * * Função das Balas* * * * * * * * * * */
var balas = [];
function createBullet(obj) {
    bala = true;
    //crate bullet (sphere geometry)
    var geometry = new THREE.SphereGeometry(15, 15, 15);
    var material = new THREE.MeshBasicMaterial({ color: 000000 });
    var sphere = new THREE.Mesh(geometry, material);
    //bullet position

    sphere.position.set(canhao.position.x, canhao.position.y, canhao.position.z);
    sphere.position.x += 382.63;
    sphere.position.y += 40;
    sphere.position.z = 1.2;
    sphere.position.applyMatrix4(canhao.matrixWorld);

    var a = new THREE.Vector3(0, -1, 0)
    sphere.direcao = a.applyMatrix4(new THREE.Matrix4().extractRotation(canhao.matrixWorld));
    scene.add(sphere);
    sphere.inc = 0;
    disparo = true;
    balas.push(sphere);
}
/* * * * * * * * * * * *  * * * * *  * */



function polvoDie() {
    polvodisparo = false;
    for (var i = 0; i < balas.length; i++) {
        var bullet2 = new THREE.Box3().setFromObject(balas[i]);
        for (var j = 0; j < polvo.length; j++) {
            var objetos2 = new THREE.Box3().setFromObject(polvo[j]);
            var collision3 = bullet2.intersectsBox(objetos2);
            if (collision3 == true) {
                scene.remove(balas[i]);
                balas.splice(i, 1);
                console.log("Polvo-Hit-Bala-Apagada")
                count++;
                console.log(count)
                return true
                if (count % 3 === 0) {
                    scene.remove(polvo[j])
                    polvo.splice(j, 1)

                    console.log("POLVO-DIE-TRUE")
                }
            }
        }
    }
    return false;
}

