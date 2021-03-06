/**
 * Created by E on 7/11/2015.
 */

//visualObject.js contains functions for drawing objects using the three.js d3.js library


//visualObjectSphere() --
// Takes a radius and a set of coordinates, converts to a Three.Vector3 Object, and maps it, with radius to a
// THREE.Sphere object. Returns THREE.Sphere Object.

function visualObjectSphere(radius, x, y, z, scene, colors){

    this.x = x;
    this.y = y;
    this.z = z;
    this.radius   = radius;
    this.scene    = scene;
    this.colors   = colors;

    var scale = 20; //vertex optimization fornula here
    var sgeometry = new THREE.SphereGeometry(  radius,scale ,scale);
    var ogeometry = new THREE.SphereGeometry( -radius*1.1, scale, scale);
    var smaterial = new THREE.MeshPhongMaterial({color: colors});
    var omaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, opacity: 0.0});

    this.mesh  = new THREE.Mesh(sgeometry,smaterial);
    this.omesh = new THREE.Mesh(ogeometry, omaterial);
    this.omesh.material.needsUpdate = true;
     mesh.position.set(x,y,z);
    omesh.position.set(x,y,z);

    GL.scene.add(mesh);
    GL.scene.add(omesh);
    return this;
};

visualObjectSphere.prototype.update = function() {
  if(this.mesh.rselected === true) {
    this.omesh.material.opacity = 1.0;
  } else {
    this.omesh.material.opacity = 0.0;
  }
}




//VisualObjectSphereColumn() - takes in array and produces data plume
// PARAMS:
//
//   data : an Array, with position as Year, from [0],being earliest, to .length, being latest
//   color: Base Color hex value
//   x: x coord of plume axis
//   z: z coord of plume axis

function visualObjectSphereColumn(data, color, x,z, scene, raycam ) {
  this.x = x;
  this.z = z;
  this.data = data;
  this.color = color;
  this.scene = scene;
  this.spheres = [];

  var y = 20;

  for(i = 0; i < data.length; i++) {
    color+=10;
    var s = visualObjectSphere(Math.pow(((0.2)*data[i]),2),
        x, (y+=(3*(data[i]))), z,
        scene, color);
    raycam.addCollider(s.mesh);
    this.spheres.push(s);

  }

  return this;
}



//visualObjectSmokeStack()
//draws chimnay at x, and y

function visualObjectSmokeStack(x,y,z, scene) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.scene = scene;

    var sgeometry = new THREE.CylinderGeometry(2, 6, 50, 52);
    var smaterial = new THREE.MeshPhongMaterial({
        color: 0x331A00,
        specular: 0xffffff,
        shininess: 1,
        shading: THREE.FlatShading

    });

    this.mesh = new THREE.Mesh(sgeometry, smaterial);
    mesh.position.set(x, y, z);

    GL.scene.add(mesh);
    return this;
}


function visualObjectBuilding(x,y,z,scene){


    this.x = x;
    this.y = y;
    this.z = z;

    this.scene = scene;
    var geometry = new THREE.BoxGeometry( 15, 10, 13 );
    var smaterial = new THREE.MeshPhongMaterial({
        color: 0x754719,
        specular: 0xffffff,
        shininess: 1,
        shading: THREE.FlatShading
        //map: texture,
        //  specularMap: spectexture
    });

    this.mesh = new THREE.Mesh( geometry, smaterial );
    mesh.position.set(x+3,y,z);

    GL.scene.add( mesh );
    return this;
}


//visualObjectGrid() -- draws grid mesh
//

function visualObjectGrid() {

    var texture = THREE.ImageUtils.loadTexture(
        'textures/patterns/citytile.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();

  /* spectexture = THREE.ImageUtils.loadTexture(
        'textures/patterns/yellowchecker.png'
    );
    spectexture.wrapS = THREE.RepeatWrapping;
    spectexture.wrapT = THREE.RepeatWrapping;
    spectexture.repeat = new THREE.Vector2(50, 50);
    spectexture.anisotropy = renderer.getMaxAnisotropy();
*/

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess:0.2,
        shading: THREE.FlatShading,
        map: texture

    });

    var geometry = new THREE.PlaneGeometry(1000, 1000);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    GL.scene.add(mesh);

    return this;
}

//Ambiant light
function visualObjectLighting() {

    var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
    GL.scene.add(light);

    return this;
}

//Adds point Light
//
function visualObjectPointLighting() {

    var objlight = new THREE.PointLight(0xffffff, 0.3);
    objlight.position.set(0, 150, 70);
    GL.scene.add(objlight);
    return this;
}


function visualObjectSkybox	() {   // prepare ShaderMaterial


    var texture = THREE.ImageUtils.loadTexture(
        'textures/patterns/sky2.jpg'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.mapping =  THREE.SphericalRefractionMapping;

        texture.wrapping = THREE.RepeatWrapping;


    var material = new THREE.MeshPhongMaterial({
        colors: 0xffffff,
        specular: 0xffff00,
        shininess:0.3,
        shading: THREE.SmoothShading,
        map: texture,
        side: THREE.BackSide,
        opacity: 0.3,
        blending: THREE.NormalBlending

    });


    var skyGeo = new THREE.SphereGeometry( 1000, 75, 75 );
    var sky = new THREE.Mesh( skyGeo, material );
    sky.overdraw=true;
    GL.scene.add( sky );




}
