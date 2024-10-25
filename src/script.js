import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js'
import GUI from 'lil-gui'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const loadingManager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(loadingManager)
const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusion = textureLoader.load("/textures/door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg")

let doorMatCapTexture = textureLoader.load("/textures/matcaps/1.png")
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")

gradientTexture.generateMipmaps = false

// To adjust colorSpace
doorColorTexture.colorSpace = THREE.SRGBColorSpace
doorMatCapTexture.colorSpace = THREE.SRGBColorSpace

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 15)
pointLight.position.set(-2,3,0)
scene.add(pointLight)

const envTexture = "/textures/environmentMap/2k.hdr"
const rgbELoader = new RGBELoader()
rgbELoader.load(envTexture, (map) =>{
    console.log("Environment Map Loaded");
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.background = map
    scene.environment = map
    
})

// Meshes and Mats
// let material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.side = THREE.DoubleSide

// Standard Materials
// let material = new THREE.MeshNormalMaterial()

// Lamber Material
// let material = new THREE.MeshLambertMaterial()

// Phong Material
// let material = new THREE.MeshPhongMaterial()
// material.shininess = 0
// material.specular = new THREE.Color(0x1188ff)

// Toon Material
// let material = new THREE.MeshToonMaterial()

// Standard Material
// let material = new THREE.MeshStandardMaterial()

// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusion
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.10
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(5,5)

// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Physical Material
let material = new THREE.MeshPhysicalMaterial()

material.sheen = 1

material.metalness = 1
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusion
material.displacementMap = doorHeightTexture
material.displacementScale = 0.10
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(5,5)
material.transparent = true
material.alphaMap = doorAlphaTexture

material.transmission = 1
material.ior = 1.5
material.thickness =0.5





material.side = THREE.DoubleSide

const planeGeometry = new THREE.PlaneGeometry(1,1,100,100)
const planeMesh = new THREE.Mesh(planeGeometry, material)
planeMesh.position.set(-1,0,-1)

const sphereGeometry = new THREE.SphereGeometry(0.5,64,64)
const sphereMesh = new THREE.Mesh(sphereGeometry, material)
sphereMesh.position.set(-3,0,-1)


const torusGeometry = new THREE.TorusGeometry(0.5,0.2, 64, 128

)
const torusMesh = new THREE.Mesh(torusGeometry, material)
torusMesh.position.set(1,0,-1)

// Add all
scene.add(planeMesh, sphereMesh, torusMesh)


// GUI

const guiOptions = {
    basicMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        planeMesh.material = new THREE.MeshBasicMaterial({color: "red"})
        sphereMesh.material = new THREE.MeshBasicMaterial({color: "red"})
        torusMesh.material = new THREE.MeshBasicMaterial({color: "red"})

        planeMesh.material.side = THREE.DoubleSide;
        sphereMesh.material.side = THREE.DoubleSide;
        torusMesh.material.side = THREE.DoubleSide;

    },
    standardMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        planeMesh.material = new THREE.MeshNormalMaterial()
        sphereMesh.material = new THREE.MeshNormalMaterial()
        torusMesh.material = new THREE.MeshNormalMaterial()

        planeMesh.material.side = THREE.DoubleSide;
        sphereMesh.material.side = THREE.DoubleSide;
        torusMesh.material.side = THREE.DoubleSide;
    },
    matCapMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();
        
        const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: doorMatCapTexture });
        planeMesh.material = matcapMaterial;
        sphereMesh.material = matcapMaterial;
        torusMesh.material = matcapMaterial;

        planeMesh.material.side = THREE.DoubleSide;
        sphereMesh.material.side = THREE.DoubleSide;
        torusMesh.material.side = THREE.DoubleSide;
    },

    lambertMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        planeMesh.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
        sphereMesh.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
        torusMesh.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
    },
    phongMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        

        planeMesh.material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide})
        sphereMesh.material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide})
        torusMesh.material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide})

        planeMesh.material.specular = new THREE.Color(0x1188ff)
        sphereMesh.material.specular = new THREE.Color(0x1188ff)
        torusMesh.material.specular = new THREE.Color(0x1188ff)
    },
    toonMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        const toonMaterial = new THREE.MeshToonMaterial({ side: THREE.DoubleSide });
        planeMesh.material = toonMaterial;
        sphereMesh.material = toonMaterial;
        torusMesh.material = toonMaterial;

        gradientTexture.minFilter = THREE.NearestFilter
        gradientTexture.magFilter = THREE.NearestFilter

        planeMesh.material.gradientMap = gradientTexture
        sphereMesh.material.gradientMap = gradientTexture
        torusMesh.material.gradientMap = gradientTexture
    },
    meshStandardMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        const meshStandardMaterial = new THREE.MeshStandardMaterial()

        planeMesh.material = meshStandardMaterial;
        sphereMesh.material = meshStandardMaterial;
        torusMesh.material = meshStandardMaterial;

        meshStandardMaterial.metalness = 1;
        meshStandardMaterial.roughness = 1;
        meshStandardMaterial.map = doorColorTexture;
        meshStandardMaterial.aoMap = doorAmbientOcclusion;
        meshStandardMaterial.displacementMap = doorHeightTexture;
        meshStandardMaterial.displacementScale = 0.10;
        meshStandardMaterial.roughness = doorRoughnessTexture;
        meshStandardMaterial.normalMap = doorNormalTexture;
        meshStandardMaterial.metalnessMap = doorMetalnessTexture;

        meshStandardMaterial.transparent = true
        meshStandardMaterial.alphaMap = doorAlphaTexture

        planeMesh.material.side = THREE.DoubleSide;
        sphereMesh.material.side = THREE.DoubleSide;
        torusMesh.material.side = THREE.DoubleSide;
    },
    physicalMaterial: () =>{
        planeMesh.material.dispose();
        sphereMesh.material.dispose();
        torusMesh.material.dispose();

        const physicalMaterial = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 1,
            map: doorColorTexture,
            aoMap: doorAmbientOcclusion,
            displacementMap: doorHeightTexture,
            displacementScale: 0.10,
            metalnessMap: doorMetalnessTexture,
            roughnessMap: doorRoughnessTexture,
            normalMap: doorNormalTexture,
            normalScale: new THREE.Vector2(5, 5),
            transparent: true,
            alphaMap: doorAlphaTexture,
            side: THREE.DoubleSide,
            sheen: 1,
            clearcoat: 0.5,
            iridescence: 1,
            iridescenceIOR: 1.3,
            iridescenceThicknessRange: [100, 400],
            transmission: 1,
            ior: 1.5,
            thickness: 0.5
        });

        planeMesh.material = physicalMaterial;
        sphereMesh.material = physicalMaterial;
        torusMesh.material = physicalMaterial;

    },
    enableWireframe: () =>{
        planeMesh.material.wireframe = !planeMesh.material.wireframe;
        sphereMesh.material.wireframe = !sphereMesh.material.wireframe;
        torusMesh.material.wireframe = !torusMesh.material.wireframe;
    }
}
const gui = new GUI()
// gui.close()

const planeFolder = gui.addFolder("Plane Mesh").close()
planeFolder.add(planeMesh.position, 'x', -5, 5, 0.01).name('Position X')
planeFolder.add(planeMesh.position, 'y', -5, 5, 0.01).name('Position Y')
planeFolder.add(planeMesh.position, 'z', -5, 5, 0.01).name('Position Z')
planeFolder.add(planeMesh.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotate X')
planeFolder.add(planeMesh.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotate Y')
planeFolder.add(planeMesh.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotate Z')

const sphereFolder = gui.addFolder("Sphere Mesh").close()
sphereFolder.add(sphereMesh.geometry.parameters, 'radius', 0.1, 5, 0.1).name('Radius').onChange((value) => {
    sphereMesh.geometry.dispose()
    sphereMesh.geometry = new THREE.SphereGeometry(value, sphereMesh.geometry.parameters.widthSegments, sphereMesh.geometry.parameters.heightSegments)
})

sphereFolder.add(sphereMesh.geometry.parameters, 'widthSegments', 3, 64, 1).name('Width Segments').onChange((value) => {
    sphereMesh.geometry.dispose()
    sphereMesh.geometry = new THREE.SphereGeometry(sphereMesh.geometry.parameters.radius, value, sphereMesh.geometry.parameters.heightSegments)
})

sphereFolder.add(sphereMesh.geometry.parameters, 'heightSegments', 2, 32, 1).name('Height Segments').onChange((value) => {
    sphereMesh.geometry.dispose()
    sphereMesh.geometry = new THREE.SphereGeometry(sphereMesh.geometry.parameters.radius, sphereMesh.geometry.parameters.widthSegments, value)
})

const torusFolder = gui.addFolder("Torus Mesh").close()
torusFolder.add(torusMesh.geometry.parameters, 'radius', 0.1, 5, 0.1).name('Radius').onChange((value) => {
    torusMesh.geometry.dispose()
    
    torusMesh.geometry = new THREE.TorusGeometry(value, torusMesh.geometry.parameters.tube, torusMesh.geometry.parameters.radialSegments, torusMesh.geometry.parameters.tubularSegments)
})

torusFolder.add(torusMesh.geometry.parameters, 'tube', 0.1, 2, 0.1).name('Tube').onChange((value) => {
    torusMesh.geometry.dispose()
    
    torusMesh.geometry = new THREE.TorusGeometry(torusMesh.geometry.parameters.radius, value, torusMesh.geometry.parameters.radialSegments, torusMesh.geometry.parameters.tubularSegments)
})

torusFolder.add(torusMesh.geometry.parameters, 'radialSegments', 2, 32, 1).name('Radial Segments').onChange((value) => {
    torusMesh.geometry.dispose()
    torusMesh.geometry = new THREE.TorusGeometry(torusMesh.geometry.parameters.radius, torusMesh.geometry.parameters.tube, value, torusMesh.geometry.parameters.tubularSegments)
})

torusFolder.add(torusMesh.geometry.parameters, 'tubularSegments', 3, 64, 1).name('Tubular Segments').onChange((value) => {
    torusMesh.geometry.dispose()
    torusMesh.geometry = new THREE.TorusGeometry(torusMesh.geometry.parameters.radius, torusMesh.geometry.parameters.tube, torusMesh.geometry.parameters.radialSegments, value)

})

gui.add(guiOptions, "enableWireframe").name("Enable Wireframe")

// "/textures/matcaps/1.png"

let matCapDirectory = {num: 1}

const materialFolder = gui.addFolder("Material Type")
materialFolder.add(guiOptions,"basicMaterial")
materialFolder.add(guiOptions, "standardMaterial").name("Standard Material")
materialFolder.add(guiOptions, "matCapMaterial").name("MatCap Material")
materialFolder.add(guiOptions, "lambertMaterial").name("Lambert Material")
materialFolder.add(guiOptions, "phongMaterial").name("Phong Material")
materialFolder.add(guiOptions,"toonMaterial").name("Toon Material")
materialFolder.add(guiOptions, "meshStandardMaterial").name("Standard Material")
materialFolder.add(guiOptions, "physicalMaterial").name("Physical Material")

const matCapFolder = materialFolder.addFolder("Matcap Textures")

matCapFolder.add(matCapDirectory, "num").min(1).max(7).step(1).name("Texture").onChange((n) =>{
    matCapDirectory.num = n
    let matCapURL = `/textures/matcaps/${matCapDirectory.num}.png`

    const newMatCapTexture = textureLoader.load(matCapURL)

    // Dispose of the old material
    planeMesh.material.dispose()
    sphereMesh.material.dispose()
    torusMesh.material.dispose()

    // Create and assign the new material with the new matcap texture
    const newMaterial = new THREE.MeshMatcapMaterial({ matcap: newMatCapTexture, side: THREE.DoubleSide })
    planeMesh.material = newMaterial
    sphereMesh.material = newMaterial
    torusMesh.material = newMaterial    
})

const lightingFolder = gui.addFolder("Lighting")
lightingFolder.add(pointLight,"intensity").min(0).max(100).step(0.01).name("DirLight Intensity")

let phongOptions = {
    shininess: 0
}
const phongFolder = gui.addFolder("Phong Attributes")
phongFolder.add(phongOptions, "shininess").min(0).max(1000).step(1).onChange((n) =>{
    planeMesh.material.shininess = n
    sphereMesh.material.shininess = n
    torusMesh.material.shininess = n
})

let standardMatOptions = {
    roughness: 0,
    metalness: 0,
}
const standardFolder = gui.addFolder("Standard Material Attributes")

standardFolder.add(standardMatOptions, "roughness").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.roughness = value;
    sphereMesh.material.roughness = value;
    torusMesh.material.roughness = value;
}).name("Roughness");

standardFolder.add(standardMatOptions, "metalness").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.metalness = value;
    sphereMesh.material.metalness = value;
    torusMesh.material.metalness = value;
}).name("Metalness");

let physicalOptions = {
    clearcoat: 0,
    sheen: 1,
    sheenRoughness: 0.25,
    sheenColor: () =>{
        const color = new THREE.Color();
        const colorController = physicalFolder.addColor(physicalOptions, "sheenColor").name("Sheen Color").onChange((value) => {
            color.set(value);
            planeMesh.material.sheenColor = color;
            sphereMesh.material.sheenColor = color;
            torusMesh.material.sheenColor = color;
        });
    },
    iridescence: 1,
    iridescenceIOR: 1,
    iridescenceMinThicknessRange: 0,
    iridescenceMaxThicknessRange: 0,
    transmission: 1,
    ior: 1.5,
    thickness: 0.5
} 
const physicalFolder = gui.addFolder("Physical Material")

physicalFolder.add(physicalOptions, "clearcoat").min(0).max(1).step(0.01).onChange((value) =>{
    planeMesh.material.clearcoat = value;
    sphereMesh.material.clearcoat = value;
    torusMesh.material.clearcoat = value;
}).name("Clearcoat");
physicalFolder.add(physicalOptions, "sheen").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.sheen = value;
    sphereMesh.material.sheen = value;
    torusMesh.material.sheen = value;
}).name("Sheen");

physicalFolder.add(physicalOptions, "sheenRoughness").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.sheenRoughness = value;
    sphereMesh.material.sheenRoughness = value;
    torusMesh.material.sheenRoughness = value;
}).name("Sheen Roughness");
physicalFolder.addColor(physicalOptions, "sheenColor").name("Sheen Color").onChange((value) => {
    const color = new THREE.Color(value);
    planeMesh.material.sheenColor = color;
    sphereMesh.material.sheenColor = color;
    torusMesh.material.sheenColor = color;
});
physicalFolder.add(physicalOptions, "iridescence").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.iridescence = value;
    sphereMesh.material.iridescence = value;
    torusMesh.material.iridescence = value;
}).name("Iridescence");

physicalFolder.add(physicalOptions, "iridescenceIOR").min(1).max(2.5).step(0.01).onChange((value) => {
    planeMesh.material.iridescenceIOR = value;
    sphereMesh.material.iridescenceIOR = value;
    torusMesh.material.iridescenceIOR = value;
}).name("Iridescence IOR");
physicalFolder.add(physicalOptions, "iridescenceMinThicknessRange").min(0).max(1000).step(1).onChange((value) => {
    planeMesh.material.iridescenceThicknessRange = [value, physicalOptions.iridescenceMaxThicknessRange];
    sphereMesh.material.iridescenceThicknessRange = [value, physicalOptions.iridescenceMaxThicknessRange];
    torusMesh.material.iridescenceThicknessRange = [value, physicalOptions.iridescenceMaxThicknessRange];
}).name("Iridescence Min Thickness");

physicalFolder.add(physicalOptions, "iridescenceMaxThicknessRange").min(0).max(1000).step(1).onChange((value) => {
    planeMesh.material.iridescenceThicknessRange = [physicalOptions.iridescenceMinThicknessRange, value];
    sphereMesh.material.iridescenceThicknessRange = [physicalOptions.iridescenceMinThicknessRange, value];
    torusMesh.material.iridescenceThicknessRange = [physicalOptions.iridescenceMinThicknessRange, value];
}).name("Iridescence Max Thickness");
physicalFolder.add(physicalOptions, "transmission").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.transmission = value;
    sphereMesh.material.transmission = value;
    torusMesh.material.transmission = value;
}).name("Transmission");

physicalFolder.add(physicalOptions, "ior").min(1).max(2.5).step(0.01).onChange((value) => {
    planeMesh.material.ior = value;
    sphereMesh.material.ior = value;
    torusMesh.material.ior = value;
}).name("IOR");

physicalFolder.add(physicalOptions, "thickness").min(0).max(1).step(0.01).onChange((value) => {
    planeMesh.material.thickness = value;
    sphereMesh.material.thickness = value;
    torusMesh.material.thickness = value;
}).name("Thickness");

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('keydown',(event) =>{
    if (event.key === 'h') {
        if (gui._hidden) {
            gui.show();
        } else {
            gui.hide();
        }
    }
})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Rotate meshes
    planeMesh.rotation.y = 0.1  * elapsedTime
    torusMesh.rotation.y = 0.1 * elapsedTime
    sphereMesh.rotation.y = 0.1 * elapsedTime


    torusMesh.rotation.x = -0.15 * elapsedTime
    sphereMesh.rotation.x = -0.15 * elapsedTime
    planeMesh.rotation.x = -0.15 * elapsedTime
    


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()