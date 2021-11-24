let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create the visitor model instance
// let visitorModel = require("../models/visitor");
// let Visitor = visitorModel.Visitor;

module.exports.displayDashboardPage = (req, res, next) => {
  let randomDate = new Date(2021, 11, 10);
  let month = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let datestring = `${
    month[randomDate.getMonth() - 1]
  } ${randomDate.getDate()}, ${randomDate.getFullYear()}`;
  // example essay
  let essays = [
    {
      id: "15236",
      title: "My first essay title",
      date: datestring,
      status: "Complete",
      type: "Academic",
      promptTitle: [
        "This first prompt very very long long I'm gonna make it super long so I can test elipse",
        "Next prompt title",
      ],
    },
    {
      id: "52368",
      title: "My second some title",
      date: datestring,
      status: "Pending",
      type: "General",
      promptTitle: ["Some of my prompts"],
    },
    {
      id: "23451",
      title: "My second some title",
      date: datestring,
      status: "Pending",
      type: "General",
      promptTitle: ["Some of my prompts"],
    },
  ];
  res.render("student/dashboard", {
    title: "Dashboard",
    username: req.user ? req.user.username : "",
    essays: essays,
  });
};

module.exports.displayTestYourselfCustomization = (req, res, next) => {
  res.render("student/test-yourself-customization", {
    title: "test-yourself",
  });
};

module.exports.displayTestYourselfSingle = (req, res, next) => {
  res.render("student/test-yourself-single", {
    title: "test-yourself",
  });
};

module.exports.displayTestYourselfMultiple = (req, res, next) => {
  res.render("student/test-yourself-multiple", {
    title: "test-yourself",
  });
};
module.exports.displayFeedbacks = (req, res, next) => {
  let randomDate = new Date(2021, 11, 10);

  let month = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let datestring = `${
    month[randomDate.getMonth() - 1]
  } ${randomDate.getDate()}, ${randomDate.getFullYear()}`;

  // example essay
  let essays = [
    {
      id: "15236",
      title: "My first essay title",
      potentialScore: 5,
      date: datestring,
      status: "Complete",
      type: "Academic",
      promptTitle: [
        "This first prompt very very long long I'm gonna make it super long so I can test elipse",
        "Next prompt title",
      ],
      content: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      ],
    },
    {
      id: "52368",
      title: "My second some title",
      potentialScore: 6,
      date: datestring,
      status: "Not assigned yet",
      type: "General",
      promptTitle: ["Some of my prompts"],
      content: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      ],
    },
    {
      id: "23451",
      title: "My second some title",
      potentialScore: 3,
      date: datestring,
      status: "Under review",
      type: "General",
      promptTitle: ["Some of my prompts"],
      content: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      ],
    },
  ];
  res.render("student/feedbacks", {
    title: "Pending Feedbacks",
    username: req.user ? req.user.username : "",
    essays: essays,
  });
};
module.exports.displayFeedback = (req, res, next) => {
  let randomDate = new Date(2021, 11, 10);

  let month = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let datestring = `${
    month[randomDate.getMonth() - 1]
  } ${randomDate.getDate()}, ${randomDate.getFullYear()}`;

  let instructor = {
    id: "51252",
    date: datestring,
    feedback: "Perfect!",
    correctedBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }

  // example essay
  let essay =
    {
      id: "15236",
      title: "My first essay title",
      potentialScore: 5,
      date: datestring,
      status: "Complete",
      type: "Academic",
      instructor: instructor,
      promptTitle: [
        "This first prompt very very long long I'm gonna make it super long so I can test elipse",
        "Next prompt title",
      ],
      content: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      ],
    };
  res.render("student/feedback-detail", {
    title: "Pending Feedbacks",
    username: req.user ? req.user.username : "",
    essay: essay,
  });
};
