<template>
    <div class="text-center mt-3">
        <h4 class="text-primary fw-bold">Customise Your Journal</h4>
    </div>
    <div class="canvas mx-auto">
        <Renderer ref="renderer" alpha antialias orbit-ctrl resize>
            <Camera ref="camera" fov="50" :position="{ x: 0, y: 0, z: 600 }" />
            <Scene ref="scene">
                <AmbientLight color="white" :intensity="0.8" />
                <DirectionalLight
                    ref="dirLight"
                    color="white"
                    :position="{ x: -1, y: 1.75, z: 1 }"
                    :intensity="1"
                />
                <PointLight ref="pointLight"></PointLight>
            </Scene>
        </Renderer>
    </div>
    <div class="d-flex mx-auto justify-content-center mb-4">
        <div
            class="circle"
            :key="index"
            v-for="(color, index) in colors"
            :style="{
                backgroundColor: color,
                border: color === selectedColor ? '3px solid black' : 'none',
                boxShadow:
                    color === selectedColor
                        ? '0px 0px 10px rgba(0, 0, 0, 0.5)'
                        : 'none',
            }"
            @click="changeCoverColor(color)"
        ></div>
    </div>
    <div
        class="mx-auto btn btn-primary justify-content-center mb-5"
        @click="goToJournal"
    >
        Confirm
    </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import router from "@/router";
import { auth } from "../firebase/index";
import { getDatabase, ref, get, child, update } from "firebase/database";

export default {
    data() {
        return {
            coverMesh: null,
            selectedColor: "#8e111d",
            colors: ["#8e111d", "#32390f", "#5f89cc", "#cdb4db"],
        };
    },
    methods: {
        changeCoverColor(color) {
            if (this.coverMesh) {
                this.coverMesh.material.color.set(color);
                this.selectedColor = color;
            }
        },
        goToJournal() {
            const user = auth.currentUser;
            const db = getDatabase();
            const dbRef = ref(db);

            get(child(dbRef, `users/${user.uid}`)).then(() => {
                update(ref(db, "users/" + user.uid), {
                    selectedColor: this.selectedColor,
                });
            });
            router.push("/journal");
        },
    },
    mounted() {
        const renderer = this.$refs.renderer.renderer;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        const scene = this.$refs.scene.scene;
        const pointLight = this.$refs.pointLight.light;
        pointLight.color.setHSL(0.995, 0.5, 0.9);
        pointLight.position.set(0, 45, -2000);
        const camera = this.$refs.camera.camera;

        const manager = new THREE.LoadingManager();
        manager.onProgress = async (url, loaded, total) => {
            if (Math.floor((loaded / total) * 100) === 100) {
                this.loadingProcess = Math.floor((loaded / total) * 100);
                console.log(`Island is loaded at: ${this.loadingProcess}%`);
            } else {
                this.loadingProcess = Math.floor((loaded / total) * 100);
                console.log(
                    `Island is last loaded at: ${this.loadingProcess}%`
                );
                this.sceneReady = false;
            }
        };

        const loader = new GLTFLoader(manager);
        loader.load("/models/book.gltf", (mesh) => {
            mesh.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.metalness = 0.4;
                    child.material.roughness = 0.6;
                    if (child.material.name == "cover") {
                        this.coverMesh = child;
                    }
                }
            });
            mesh.scene.position.set(-150, 10, 10);
            mesh.scene.rotation.set(2, 0, 0.8);
            mesh.scene.scale.set(150, 150, 150);
            scene.add(mesh.scene);
        });

        const dirLight = this.$refs.dirLight.light;
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.multiplyScalar(30);
        const orbitCtrl = this.$refs.renderer.three.cameraCtrl;
        orbitCtrl.enableZoom = false;
        orbitCtrl.target.set(0, 0, 0);
        orbitCtrl.enableDamping = true;
        orbitCtrl.enablePan = false;
        orbitCtrl.maxPolarAngle = 1.5;
        orbitCtrl.minDistance = 50;
        orbitCtrl.maxDistance = 1200;

        const animate = () => {
            requestAnimationFrame(animate);
            orbitCtrl && orbitCtrl.update();
        };

        renderer.render(scene, camera);

        animate();
    },
};
</script>

<style scoped>
.circle {
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
}
.canvas {
    height: 100%;
}
</style>
