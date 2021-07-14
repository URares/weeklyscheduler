export default class ActivityList {
  data = [
    {
      morning: {
        start: "09:00",
        end: "11:00",
        type: "Alergare Usoara",
      },
      evening: {
        start: "19:00",
        end: "21:00",
        type: "Inot",
      },
    },
    {
      morning: {
        start: "09:00",
        end: "10:00",
        type: "Maraton",
      },
      evening: {
        start: "17:00",
        end: "19:00",
        type: "Dans",
      },
    },
    {
      morning: {
        start: "09:00",
        end: "10:00",
        type: "Inot",
      },
      evening: {
        start: "17:00",
        end: "19:00",
        type: "Maraton",
      },
    },
    {
      morning: {
        start: "09:00",
        end: "10:00",
        type: "Inot",
      },
      evening: {
        start: "17:00",
        end: "19:00",
        type: "Karate",
      },
    },
    {
      morning: {
        start: "09:00",
        end: "10:00",
        type: "Inot",
      },
      evening: {
        start: "17:00",
        end: "19:00",
        type: "Ciclism",
      },
    },
  ]

  getActivities(day) {
    return this.data[day]
  }

  setActivity(idx, data) {
    this.data[idx] = data
  }
}
