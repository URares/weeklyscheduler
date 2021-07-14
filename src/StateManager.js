const MAX_DAYS = 5
import controller from "./app"

export default class StateManager {
  static _currentDay = 0

  static goToNextDay() {
    if (StateManager._currentDay < MAX_DAYS - 1) {
      StateManager._currentDay++
    }
  }

  static gotoPrevDay() {
    if (StateManager._currentDay > 0) {
      StateManager._currentDay--
    }
  }

  static getCurrentDay() {
    return StateManager._currentDay
  }

  static saveDay(data) {
    controller.activityList.setActivity(StateManager._currentDay, data)
  }
}
