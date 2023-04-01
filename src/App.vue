<script setup lang="ts">
import { onMounted, ref } from "vue"
import Reveal from "reveal.js"
import RevealMath from 'reveal.js/plugin/math/math.esm.js'
import Editor from "./components/editor.vue"

const page = ref(1)
const step = ref(1)
let oldStep: number = 1
// let lastPage: number = 0

onMounted(() => {
  Reveal.initialize({
    plugins: [ RevealMath ]
  })
  Reveal.on('fragmentshown', event => {
    step.value++
    console.log("step", step.value)
  })
  Reveal.on('fragmenthidden', event => {
    step.value--
    console.log("step", step.value)
  })
  Reveal.on('slidechanged', event => {
    page.value = event.indexh + 1
    const t = oldStep
    oldStep = step.value
    step.value = t
    console.log("page", page.value, event)
  })
})
</script>

<template>
  <div id="ppt" class="reveal">
    <div class="slides">
      <section><h1>二向箔与矩阵</h1></section>
      <section>
        <section class="r-stack" style="height: 100%;" :class="{
          'page2-1': (page === 2 && step === 1) || page === 1,
          'page2-2': page === 2 && step === 2,
          'page2-3': (page === 2 && step >= 3) || page === 3
        }">
          <div class="part1">
            <h2>矩阵</h2>
            <p v-show="step < 4">
              \[\begin{bmatrix}
              \color{white}1 & \color{white}0 & \color{white}2\\
              \color{white}5 & \color{white}{-2} & \color{white}{-1}\\
              \color{white}4 & \color{white}{-3} & \color{white}3
              \end{bmatrix} \]
            </p>
            <p v-show="step === 4">
              \[\begin{bmatrix}
              \color{red}1 & \color{green}0 & \color{blue}2\\
              \color{gray}5 & \color{gray}{-2} & \color{gray}{-1}\\
              \color{gray}4 & \color{gray}{-3} & \color{gray}3
              \end{bmatrix} \]
            </p>
            <p v-show="step === 5">
              \[\begin{bmatrix}
              \color{gray}1 & \color{gray}0 & \color{gray}2\\
              \color{red}5 & \color{green}{-2} & \color{blue}{-1}\\
              \color{gray}4 & \color{gray}{-3} & \color{gray}3
              \end{bmatrix} \]
            </p>
            <p v-show="step === 6">
              \[\begin{bmatrix}
              \color{gray}1 & \color{gray}0 & \color{gray}2\\
              \color{gray}5 & \color{gray}{-2} & \color{gray}{-1}\\
              \color{red}4 & \color{green}{-3} & \color{blue}3
              \end{bmatrix} \]
            </p>
          </div>
          <div class="fragment fade-in part2">
            <h2>乘向量</h2>
            <p v-show="step < 4">
              \[\cdot
              \begin{bmatrix}
              4\\
              7\\
              5
              \end{bmatrix} \]
            </p>
            <p v-show="step >= 4">
              \[\cdot
              \begin{bmatrix}
              \color{red}4\\
              \color{green}7\\
              \color{blue}5
              \end{bmatrix} \]
            </p>
          </div>
          <div class="fragment fade-in part3">
            <p v-show="step < 4">
              \[=
              \begin{bmatrix}
              14\\
              1\\
              10
              \end{bmatrix} \]
            </p>
            <p v-show="step === 4">
              \[=
              \begin{bmatrix}
              \color{white}{14}\\
              \color{gray}1\\
              \color{gray}{10}
              \end{bmatrix} \]
            </p>
            <p v-show="step === 5">
              \[=
              \begin{bmatrix}
              \color{gray}{14}\\
              \color{white}1\\
              \color{gray}{10}
              \end{bmatrix} \]
            </p>
            <p v-show="step === 6">
              \[=
              \begin{bmatrix}
              \color{gray}{14}\\
              \color{gray}1\\
              \color{white}{10}
              \end{bmatrix} \]
            </p>
          </div>
          <div class="fragment fade-in-then-out equation">
            \[ \color{red}{(1 \times 4)} + \color{green}{(0 \times 7)} + \color{blue}{(2 \times 5)} = \color{white}{14} \]
          </div>
          <div class="fragment fade-in-then-out equation">
            \[ \color{red}{(5 \times 4)} + \color{green}{(-2 \times 7)} + \color{blue}{(-1 \times 5)} = \color{white}{1} \]
          </div>
          <div class="fragment fade-in-then-out equation">
            \[ \color{red}{(4 \times 4)} + \color{green}{(-3 \times 7)} + \color{blue}{(3 \times 5)} = \color{white}{10} \]
          </div>
        </section>
      </section>
      <section>
        <section>
          <div>将三维物体转换为二维物体</div>
          <img src="/img/look-bian.jpg" class="fragment fade-in">
        </section>
      </section>
      <section>
        <section>
          <h2>第一类</h2>
          <div class="r-stack">
            <p class="fragment fade-in-then-out">
              \[ \color{green}n\left \{ 
                \begin{bmatrix}
                & & \\
                & & \\
                \end{bmatrix}
                \right .
                \cdot
                \begin{bmatrix}
                \\
                \\
                \\
                \end{bmatrix}
                =
                \left . \begin{bmatrix}
                \\
                \\
                \end{bmatrix} \right \} \color{green}n
              \]
            </p>
            <p class="fragment fade-in-then-out">
              \[ \color{green}2\left \{ 
                \begin{bmatrix}
                & & \\
                & & \\
                \end{bmatrix}
                \right .
                \cdot
                \begin{bmatrix}
                \\
                \\
                \\
                \end{bmatrix}
                =
                \left . \begin{bmatrix}
                \\
                \\
                \end{bmatrix} \right \} \color{green}2
              \]
            </p>
            <p class="fragment fade-in-then-out">
              \[ \color{green}2\left \{ 
                \begin{bmatrix}
                1 & -2 & 2\\
                -1 & 1 & -3\\
                \end{bmatrix}
                \right .
                \cdot
                \begin{bmatrix}
                2 \\
                3 \\
                -1
                \end{bmatrix}
                =
                \left . \begin{bmatrix}
                -2 \\
                4
                \end{bmatrix} \right \} \color{green}2
              \]
            </p>
            <p class="fragment fade-in-then-out">
              \[ \color{green}3\left \{ 
                \begin{bmatrix}
                1 & -2 & 2\\
                -1 & 1 & -3\\
                0 & 0 & 0
                \end{bmatrix}
                \right .
                \cdot
                \begin{bmatrix}
                2 \\
                3 \\
                -1
                \end{bmatrix}
                =
                \left . \begin{bmatrix}
                -2 \\
                4 \\
                0
                \end{bmatrix} \right \} \color{green}3
              \]
            </p>
          </div>
        </section>
        <section>
          <Editor :type="'A'" />
        </section>
      </section>
      <section>
        <section>
          <h2>第二类</h2>
          <div class="r-stack">
            <div class="fragment fade-in-then-out">
              \[ 
                \begin{bmatrix}
                 &  & 0\\
                 &  & 0\\
                 &  & 0
                \end{bmatrix}
                \cdot
                \begin{bmatrix}
                 \\
                 \\
                 \\
                \end{bmatrix}
                =
                \begin{bmatrix}
                 \\
                 \\
                 \\
                \end{bmatrix} 
              \]
            </div>
            <div class="fragment fade-in-then-out">
              \[
                \begin{bmatrix}
                1 & 3 & 0\\
                -2 & 1 & 0\\
                3 & -1 & 0
                \end{bmatrix}
                \cdot
                \begin{bmatrix}
                2 \\
                3 \\
                -1
                \end{bmatrix}
                =
                \begin{bmatrix}
                11 \\
                -1 \\
                3
                \end{bmatrix}
              \]
            </div>
            <div class="fragment fade-in-then-out">
              \[
                \begin{bmatrix}
                1 & 3 & \color{grey}0\\
                -2 & 1 & \color{grey}0\\
                3 & -1 & \color{grey}0
                \end{bmatrix}
                \cdot
                \begin{bmatrix}
                2 \\
                3 \\
                \color{grey}{-1}
                \end{bmatrix}
                =
                \begin{bmatrix}
                11 \\
                -1 \\
                3
                \end{bmatrix}
              \]
            </div>
          </div>
        </section>
        <section>
          <Editor :type="'B'" />
        </section>
      </section>
      <section>
        <section>
          <h2>第三类</h2>
          <div class="fragment fade-in-then-out">
            \[
              \begin{bmatrix}
              1 & 1 & 4\\
              -2 & 1 & 1\\
              2 & -1 & -1
              \end{bmatrix}
            \]
          </div>
        </section>
        <section>
          <Editor :type="'C'" />
        </section>
        <section>
          <h2>第三类</h2>
          <div class="r-stack">
            <div class="fragment fade-in-then-out">
              \[
                \begin{bmatrix}
                \color{red}1 & \color{green}1 & \color{blue}4\\
                \color{red}{-2} & \color{green}1 & \color{blue}1\\
                \color{red}2 & \color{green}{-1} & \color{blue}{-1}
                \end{bmatrix}
              \]
            </div>
            <div class="fragment fade-in-then-out">
              \[
                \color{red}{\begin{matrix}
                1\\
                -2\\
                2
                \end{matrix} }
                +
                \color{green}{3 \times
                \begin{matrix}
                1\\
                1\\
                -1
                \end{matrix}}
                =
                \color{blue}{\begin{matrix}
                4\\
                1\\
                -1
                \end{matrix}}
              \]
            </div>
          </div>
        </section>
      </section>
      <section>
        <section><h2>秩</h2></section>
        <section>
          <h2>矩阵一</h2>
          <div class="r-stack">
            <div class="fragment fade-in-then-out">
              \[\begin{bmatrix}
              \color{red}1 & \color{green}{-2} & \color{blue}2\\
              \color{red}{-1} & \color{green}1 & \color{blue}{-3}\\
              \end{bmatrix} \]
            </div>
            <div class="fragment fade-in-then-out">
              \[
                \color{red}{ 4 \times
                \begin{matrix}
                1\\
                -1
                \end{matrix} }
                +
                \color{green}{
                \begin{matrix}
                -2\\
                1
                \end{matrix}}
                =
                \color{blue}{\begin{matrix}
                2\\
                -3
                \end{matrix}}
              \]
            </div>
          </div>
        </section>
        <section>
          <h2>矩阵二</h2>
          <div class="r-stack">
            <div class="fragment fade-in-then-out">
              \[\begin{bmatrix}
              \color{red}1 & \color{green}3 & \color{blue}0\\
              \color{red}{-2} & \color{green}1 & \color{blue}0\\
              \color{red}3 & \color{green}{-1} & \color{blue}0
                \end{bmatrix} \]
            </div>
            <div class="fragment fade-in-then-out">
              \[
                \color{red}{ 0 \times
                \begin{matrix}
                1\\
                -2\\
                3
                \end{matrix} }
                +
                \color{green}{ 0 \times
                \begin{matrix}
                3\\
                1\\
                -1
                \end{matrix}}
                =
                \color{blue}{\begin{matrix}
                0\\
                0\\
                0
                \end{matrix}}
              \]
            </div>
          </div>
        </section>
        <section>
          <h2>矩阵三</h2>
          <div class="r-stack">
            <div class="fragment fade-in-then-out">
              \[
                \begin{bmatrix}
                \color{red}1 & \color{green}1 & \color{blue}4\\
                \color{red}{-2} & \color{green}1 & \color{blue}1\\
                \color{red}2 & \color{green}{-1} & \color{blue}{-1}
                \end{bmatrix}
              \]
            </div>
            <div class="fragment fade-in-then-out">
              \[
                \color{red}{\begin{matrix}
                1\\
                -2\\
                2
                \end{matrix} }
                +
                \color{green}{3 \times
                \begin{matrix}
                1\\
                1\\
                -1
                \end{matrix}}
                =
                \color{blue}{\begin{matrix}
                4\\
                1\\
                -1
                \end{matrix}}
              \]
            </div>
          </div>
        </section>
      </section>
      <section data-visibility="uncounted">
        <div>
          <Editor />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
#ppt {
  width: 100%;
  height: 100%;
}

.equation {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0%);
}

.page2-1 {
  .part1 {
    position: absolute;
    height: 100%;
    width: 100%;

    h2 {
      position: absolute;
      left: 50%;
      top: 25%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }

    p {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }

  .part2 {
    position: static;
    height: 100%;

    h2 {
      position: absolute;
      left: 55%;
      top: 25%;
      transform: translate(-50%, -50%);
    }

    p {
      position: absolute;
      left: 64%;
      top: 45%;
      transform: translate(-50%, -50%);
    }
  }

  .part3 {
    position: static;
    height: 100%;

    p {
      position: absolute;
      left: 71%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }
}

.page2-2 {
  .part1 {
    position: absolute;
    height: 100%;
    width: 100%;

    h2 {
      position: absolute;
      left: 37.5%;
      top: 25%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }

    p {
      position: absolute;
      left: 40%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }

  .part2 {
    position: static;
    height: 100%;

    h2 {
      position: absolute;
      left: 55%;
      top: 25%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }

    p {
      position: absolute;
      left: 64%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }

  .part3 {
    position: static;
    height: 100%;

    p {
      position: absolute;
      left: 71%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }
}

.page2-3 {
  .part1 {
    position: absolute;
    height: 100%;
    width: 100%;

    h2 {
      position: absolute;
      left: 37.5%;
      top: 25%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }

    p {
      position: absolute;
      left: 33%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }

  .part2 {
    position: static;
    height: 100%;

    h2 {
      position: absolute;
      left: 55%;
      top: 25%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }

    p {
      position: absolute;
      left: 58%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }

  .part3 {
    position: static;
    height: 100%;

    p {
      position: absolute;
      left: 76%;
      top: 45%;
      transform: translate(-50%, -50%);
      transition: left 0.5s;
    }
  }
}
</style>
