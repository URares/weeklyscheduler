import ActivityList from "./ActivityList.js"
import StateManager from "./StateManager.Js"
import DayView from "./DayView"
import SummaryActivityView from "./SummaryActivityView"

export default class Controller {
  constructor() {
    this.activityList = new ActivityList()
    this.dayView = new DayView(
      this.activityList.getActivities(StateManager.getCurrentDay())
    )
    this.summaryView = new SummaryActivityView()
  }

  toggleSummary() {
    if (!this.summaryView.isRendered) {
      this.summaryView.render()
    }

    this.summaryView.toggleDisplay(!this.summaryView.isVisible())
  }

  updateDay() {
    if (!this.dayView.isRendered) {
      this.dayView.render()
    }
    this.dayView.update(
      this.activityList.getActivities(StateManager.getCurrentDay())
    )
  }
}
