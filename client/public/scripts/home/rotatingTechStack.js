export default document.querySelectorAll(".rotating-logos").forEach((rotatingGroup) => {
  const imgNodes = []
  rotatingGroup.childNodes.forEach((node) => {
    if (node.nodeName == "IMG") {
      imgNodes.push(node)
    }
  })

  const rotateDeg = calcTurn(imgNodes.length)

  imgNodes.map((node, i) => {
    const rotation = rotateDeg * i
    node.style.transform = `rotateY(${rotation}turn) translateZ(var(--_depth))`
  })
})

function calcTurn(numOfImgs) {
  return (1 / numOfImgs).toFixed(4)
}
