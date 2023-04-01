<script setup lang="ts">
import { onUnmounted, type Ref } from "vue"
import { ref, onMounted, computed, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const props = defineProps<{
  type?: string
}>()

const leftPart = ref()
const rightPart = ref()
let partList: any[]

onMounted(() => {
  const createScene = (sceneList: Ref<HTMLDivElement>[]) => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight / sceneList.length, 0.1, 1000);
    camera.position.x = 2;
    camera.position.y = 3;
    camera.position.z = 4;
    return sceneList.map(item => {
      const content = item.value;

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(content.getBoundingClientRect().width, content.getBoundingClientRect().height);
      renderer.setClearAlpha(0);

      content.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true

      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(1.0, 0.0, 0.0)]), new THREE.LineBasicMaterial({ color: 0xff0000 })));
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0)]), new THREE.LineBasicMaterial({ color: 0x00ff00 })));
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(0.0, 0.0, 1.0)]), new THREE.LineBasicMaterial({ color: 0x0000ff })));
      const pointGroup = new THREE.Object3D()
      scene.add(pointGroup)

      // content.addEventListener("resize", () => {
      //   partList[0].camera.aspect = partList[0].content.getBoundingClientRect().width / partList[0].content.getBoundingClientRect().height;
      //   partList[0].camera.updateProjectionMatrix();
      //   partList.forEach(item => item.renderer.setSize(item.content.getBoundingClientRect().width, item.content.getBoundingClientRect().height));
      // })

      content.onresize = () => {
        partList[0].camera.aspect = partList[0].content.getBoundingClientRect().width / partList[0].content.getBoundingClientRect().height;
        partList[0].camera.updateProjectionMatrix();
        partList.forEach(item => item.renderer.setSize(item.content.getBoundingClientRect().width, item.content.getBoundingClientRect().height));
      }

      return {
        content,
        scene,
        renderer,
        controls,
        camera,
        pointGroup
      }
    })
  }
  partList = createScene([leftPart, rightPart])

  const animate = () => {
    requestAnimationFrame(animate);
    partList[0].camera.aspect = partList[0].content.getBoundingClientRect().width / partList[0].content.getBoundingClientRect().height;
    partList[0].camera.updateProjectionMatrix();
    partList.forEach(item => {
      item.controls.update();
      item.renderer.setSize(item.content.getBoundingClientRect().width, item.content.getBoundingClientRect().height);
      item.renderer.render(item.scene, item.camera);
    })
  }
  animate();
  
  randomSetVecList(10);
  partList[0].pointGroup.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(vecList.value), new THREE.PointsMaterial({ size: 0.1 })));
  switch (props.type) {
    case "A":
      mat.value = [new THREE.Vector3(1, -2, 2), new THREE.Vector3(-1, 1, -3), new THREE.Vector3(0, 0, 0)];
      break

    case "B":
      mat.value = [new THREE.Vector3(1, 3, 0), new THREE.Vector3(-2, 1, 0), new THREE.Vector3(3, -1, 0)];
      break

    case "C":
      mat.value = [new THREE.Vector3(1, 1, 4), new THREE.Vector3(-2, 1, 1), new THREE.Vector3(2, -1, -1)];
      break

    default:
      mat.value = [new THREE.Vector3(1.0, 0.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0), new THREE.Vector3(0.0, 0.0, 1.0)];
  }
  updateResList();
})

const vecList = ref<any[]>([])
const mat = ref([new THREE.Vector3(1.0, 0.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0), new THREE.Vector3(0.0, 0.0, 1.0)])
const resList = ref<any[]>([])

const matrix = computed(() => {
  const m = mat.value
  return new THREE.Matrix3().set(m[0].x, m[0].y, m[0].z, m[1].x, m[1].y, m[1].z, m[2].x, m[2].y, m[2].z)
})

const getRand = () => {
  return (Math.round(Math.random() * 200)) / 100 - 1
}

const getRandInt = () => {
  return Math.round(Math.random() * 6) - 3
}

const randomSetVecList = (count = 10) => {
  vecList.value = new Array(count).fill(0).map(() => new THREE.Vector3((Math.round(Math.random() * 200)) / 100 - 1, Math.round(Math.random() * 200) / 100 - 1, Math.round(Math.random() * 200) / 100 - 1))
}

const randomMatrixB = () => {
  mat.value = [new THREE.Vector3(getRandInt(), getRandInt(), 0), new THREE.Vector3(getRandInt(), getRandInt(), 0), new THREE.Vector3(getRandInt(), getRandInt(), 0)];
}

const randomMatrixA = () => {
  mat.value = [new THREE.Vector3(getRandInt(), getRandInt(), getRandInt()), new THREE.Vector3(getRandInt(), getRandInt(), getRandInt()), new THREE.Vector3(0.0, 0.0, 0.0)];
}

const randomMatrixC = () => {
  const mat1 = [[getRandInt(), getRandInt()], [getRandInt(), getRandInt()], [getRandInt(), getRandInt()]]
  const mat2 = [[getRandInt(), getRandInt()], [getRandInt(), getRandInt()], [getRandInt(), getRandInt()]]
  mat.value = mat1.map(row => new THREE.Vector3(...mat2.map(col => row[0] * col[0] + row[1] * col[1])))
}

const updateResList = () => {
  resList.value = vecList.value.map(vec => vec.clone().applyMatrix3(matrix.value));
  partList[1].pointGroup.remove(...partList[1].pointGroup.children);
  partList[1].pointGroup.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(resList.value), new THREE.PointsMaterial({ size: 0.1 })));
}

const unWatchVecList = watch(vecList, (val)=> {
    partList[0].pointGroup.remove(...partList[0].pointGroup.children)
    partList[0].pointGroup.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(val), new THREE.PointsMaterial({ size: 0.1 })))
    updateResList()
}, { deep: true })

const unWatchMat = watch(mat, (val) => {
  updateResList()
}, { deep: true })

onUnmounted(() => {
  unWatchMat()
  unWatchVecList()
})
</script>

<template>
  <div>
    <div class="content">
      <div ref="leftPart"></div>
      <div ref="rightPart"></div>
    </div>
    <div class="form">
      <div class="vec-list">
        <div>
          <div v-for="(vec, i) in vecList" :key="i">
            <input type="number" step="0.01" v-model="vec.x" />
            <input type="number" step="0.01" v-model="vec.y"/>
            <input type="number" step="0.01" v-model="vec.z"/>
          </div>
        </div>
        <button @click="randomSetVecList(10)">随机10个</button>
        <button @click="randomSetVecList(30)">随机30个</button>
        <button @click="randomSetVecList(100)">随机100个</button>
      </div>
      <div class="vec-list vec-list-middle">
        <div>
          <div v-for="(vec, i) in mat" :key="i">
            <input type="number" step="0.01" v-model="vec.x" />
            <input type="number" step="0.01" v-model="vec.y"/>
            <input type="number" step="0.01" v-model="vec.z"/>
          </div>
        </div>
        <div class="btnGroup" v-if="!type">
          <button class="btn" @click="randomMatrixA()">随机第一类</button>
          <button class="btn" @click="randomMatrixB()">随机第二类</button>
          <button class="btn" @click="randomMatrixC()">随机第三类</button>
        </div>
      </div>
      <div class="vec-list vec-list-right">
        <div>
          <div v-for="(vec, i) in resList" :key="i">
            <input type="number" step="0.01" readonly v-model="vec.x" />
            <input type="number" step="0.01" readonly v-model="vec.y"/>
            <input type="number" step="0.01" readonly v-model="vec.z"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;

  * {
    flex: 1;
    height: 100%;
    width: 50%;
  }
}

.form {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  pointer-events: none;
}

.vec-list {
  position: absolute;
  left: -150px;
  width: 200px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  pointer-events: all;

  div {
    overflow-y: auto;

    div {
      flex: 1;
      display: flex;
      flex-direction: row;

      input {
        flex: 1 1;
        width: 30%;
        border-color: #42affa;
        background-color: #25465c;
        color: white;
      }
    }
  }

  .btnGroup {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-content: stretch;
  }
}

.vec-list-right {
  left: unset;
  right: -150px;
}

.vec-list-middle {
  left: 50%;
  transform: translate(-50%, 0%);
}
</style>
