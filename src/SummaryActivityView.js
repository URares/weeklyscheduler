import controller from "./app"
import Utils from "./Utils"
export default class SummaryActivityView {
  constructor() {
    this.el = document.getElementById("summary")
    this.isRendered = false
  }

  render() {
    const template = document.getElementById("summaryTpl")
    const tplClone = template.content.firstElementChild.cloneNode(true)
    this.el.appendChild(tplClone)
    this.el.style.display = "none"

    this.update()
    this.isRendered = true
  }

  getActivityHTML(data) {
    return `<li>${data.start}-${data.end} ${data.type}</li>`
  }

  isVisible() {
    return this.el.style.display != "none"
  }

  toggleDisplay(show) {
    if (show) {
      this.el.style.display = "block"
      this.update()
    } else {
      this.el.style.display = "none"
    }
  }

  update() {
    this.el.querySelector("#activityList").innerHTML = ""

    controller.activityList.data.forEach((activity, idx) => {
      const name = Utils.getDayName(idx)
      this.el.querySelector("#activityList").innerHTML += `<p>${name}</p><ul>`
      this.el.querySelector("#activityList").innerHTML += this.getActivityHTML(
        activity.morning
      )
      this.el.querySelector("#activityList").innerHTML += this.getActivityHTML(
        activity.evening
      )
      this.el.querySelector("#activityList").innerHTML += "<ul/>"
    })
  }
}
