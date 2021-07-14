import ActivityView from "./ActivityView"
import Utils from "./Utils"
import StateManager from "./StateManager.Js"

import controller from "./app"
export default class DayView {
  constructor(props) {
    this.el = document.getElementById("container")
    this.props = props
    this.isRendered = false
  }

  render() {
    const template = document.getElementById("dayTpl")
    const tplClone = template.content.firstElementChild.cloneNode(true)
    this.el.appendChild(tplClone)

    this.morningActivity = new ActivityView("morning", this.props.morning)
    this.morningActivity.render()

    this.eveningActivity = new ActivityView("evening", this.props.evening)
    this.eveningActivity.render()

    this.update(this.props)

    this.el.querySelector("#nextBtn").addEventListener("click", this.onNext)
    this.el.querySelector("#prevBtn").addEventListener("click", this.onPrev)
    this.el
      .querySelector("#summaryBtn")
      .addEventListener("click", this.onSummary.bind(this))

    this.isRendered = true
  }

  update(props) {
    this.el.querySelector("#dayName").innerHTML = Utils.getDayName(
      StateManager.getCurrentDay()
    )
    this.morningActivity.update(props.morning)
    this.eveningActivity.update(props.evening)
  }

  onNext() {
    StateManager.goToNextDay()
    controller.updateDay()
  }

  onPrev() {
    StateManager.gotoPrevDay()
    controller.updateDay()
  }

  onSummary() {
    StateManager.saveDay(this.getData())
    controller.toggleSummary()
  }

  getData() {
    return {
      morning: this.morningActivity.getData(),
      evening: this.eveningActivity.getData(),
    }
  }
}
