<template>
  <div
    id="csthink-terminal-div"
    style="margin: -10px"
  >
    <vue-terminal
      class="csthink-terminal"
      :task-list="taskList"
      :command-list="commandList"
      style="width: 100%;margin: 0 auto"
    />
  </div>
</template>

<script>
 import VueTerminal from 'vue-terminal'
// import VueTerminal from './assets/js/vue-terminal'

 const commandList = {
  contact: {
    description: 'contact author',
    messages: [
      { message: 'Website: https://csthink.com' },
      { message: 'Email: security.2009@live.cn' },
      { message: 'Github: https://github.com/csthink' },
      { message: 'WeChat: kcly119' },
      { message: 'QQ: 1454591941' }
    ]
  },
  about: {
    description: 'About author',
    messages: [
      {
        message: 'My name is du mingyang. I\'m a programmer, You can visit my personal website at http://csthink.com to learn more about me and my GitHub page (https://github.com/csthink) to see some of the projects that I\'ve worked on.'
      }
    ]
  }
}

function generateTime() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  let timeString = '' + hours;
  timeString += (minutes < 10 ? ':0' : ':') + minutes;
  timeString += (seconds < 10 ? ':0' : ':') + seconds;
  return timeString
}

const mockData = [
    {
      time: generateTime(),
      type: 'info',
      label: 'System',
      message: `Welcome to CSTHINK, You can also visit my GitHub page (https://github.com/csthink) to see some of the projects that I've worked on.`
    },
    {
      time: generateTime(),
      type: 'info',
      label: 'Info',
      message: 'Initialization Start ...'
    },
    {
      time: generateTime(),
      type: 'info',
      label: 'Info',
      message: `✈………………✈………………✈………………✈`
    }
]

const taskList = {
  echo: {
    description: 'Echoes input',
    echo(pushToList, input) {
      input = input.split(' ')
      input.splice(0, 1)
      const p = new Promise(resolve => {
        pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
        resolve({ type: 'success', label: '', message: '' })
      })
      return p
    }
  },
  defaultTask: {
    description: 'this is default task.',
    defaultTask(pushToList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          mockData[i].time = generateTime()
          pushToList(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({ type: 'success', label: 'Success', message: 'ღ Initialization Complete ...' })
          }
        }, 1000);
      })
      return p
    }
  },
  open: {
    description: 'Open a specified url in a new tab.',
    open(pushToList, input) {
      const p = new Promise((resolve, reject) => {
        let url = input.split(' ')[1]
        if (!url) {
          reject({ type: 'error', label: 'Error', message: 'a url is required!' })
          return
        }
        pushToList({ type: 'success', label: 'Success', message: 'Opening' })

        if (input.split(' ')[1].indexOf('http') === -1) {
          url = 'http://' + input.split(' ')[1]
        }
        window.open(url, '_blank')
        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
      })
      return p;
    }
  }
}

  export default {
    components: { VueTerminal },
    data () {
      return {
        taskList: taskList,
        commandList: commandList
      }
    }
  }
</script>

<style scoped>
.show-in-github {
  display: none;
}

.page-edit {
  display: none;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background-color: #f5f5f5
}

::-webkit-scrollbar-track {
    background-color: #f5f5f5
}

::-webkit-scrollbar-thumb,::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
}

::-webkit-scrollbar-thumb {
    background-image: -webkit-gradient(linear,left bottom,left top,color-stop(.44,#3cba92),color-stop(.72,#fdbb2d),color-stop(.86,#fdbb2d));
    transition: .3s ease-in-out
}

::-webkit-scrollbar-thumb:hover {
    background-image: -webkit-gradient(linear,left bottom,left top,color-stop(.44,#fdbb2d),olor-stop(.72,#fdbb2d),color-stop(.86,#3cba92));
    transition: .3s ease-in-out
}
</style>
