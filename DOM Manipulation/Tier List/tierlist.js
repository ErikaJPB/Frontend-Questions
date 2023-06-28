const items = document.querySelectorAll(".item").forEach(makeDraggable);
const dropZones = document
  .querySelectorAll(".drop-zone")
  .forEach(makeDroppable);

function makeDraggable(item) {
  item.draggable = true;
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dblclick", (e) => {
    appendToUnranked(item);
  });
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function appendToUnranked(item) {
  const unranked = document.getElementById("unranked-drop-zone");
  if (item.parentElement !== unranked) {
    unranked.appendChild(item);
  }
}

function makeDroppable(dropZone) {
  dropZone.addEventListener("dragover", (e) => e.preventDefault());
  dropZone.addEventListener("drop", drop);
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  const item = document.getElementById(data);

  if (e.target.classList.contains("drop-zone")) {
    if (item.parentElement !== e.target) {
      e.target.appendChild(item);
    }
  } else if (e.target.classList.contains("item")) {
    const dropZone = e.target.parentElement;

    if (item.parentElement !== dropZone) {
      dropZone.appendChild(item);
    }
  }
}
