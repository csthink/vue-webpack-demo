import bg from '../image/bg.jpg'
import style from '../style/test.css'

function Test () {
  var root = document.getElementById('root')

  var testDiv = document.createElement('div')
  testDiv.setAttribute('id', '$style.test')
  testDiv.innerText = 'Test ...'
  root.appendChild(testDiv)

  // var img = new Image()
  // img.src = bg
  // img.classList.add("$style.bg")
  // root.appendChild(img)

  var testFontDiv = document.createElement('div')
  var testFont = `
    <div class="$style.iconfont $style.iconzhixianghuishou"></div>
    <div class="$style.iconfont $style.iconkehuishou-buliaolei"></div>
  `
  testFontDiv.innerHTML = testFont
  root.appendChild(testFontDiv)
}

export default Test
