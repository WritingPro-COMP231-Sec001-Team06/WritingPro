let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let StudentPrompts = require("../models/prompt-student");
let Essays = require("../models/essay");

// let tempUser = new {
//   studentID: "123214",
//   email: "example@email.com",
//   password: "password123",
//   firstName: "Heesoo",
//   lastName: "Lim",
//   address: "123 Some avenue",
//   city: "Toronto",
//   country: "Canada",
//   firstLanguage: "Spanish",
//   startingIELTSLevel: 5,
//   targerScore: 9,
//   targetTestCountry: "Canada"
// }

// create the visitor model instance
// let visitorModel = require("../models/visitor");
// let Visitor = visitorModel.Visitor;

module.exports.displayDashboardPage = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  Essays.find({ studentID: req.user._id }, (err, essays) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    console.log(essays[0].promptId);
    let promptTitles = [];

    essays.forEach((essay) => {
      StudentPrompts.find({ _id: essay.promptId }, (err, prompt) => {
        if(prompt.length > 0) {
          promptTitles.push(prompt[0].promptMessage);
        }
        if (promptTitles.length === essays.length) {
          res.render("student/dashboard", {
            username: req.user ? req.user.username: '',
            title: "Dashboard",
            essays: essays,
            promptTitles: promptTitles,
          });
        }
      });
    });
  });

  // let randomDate = new Date(2021, 11, 10);
  // let month = [
  //   "Jan",
  //   "Fab",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // let datestring = `${
  //   month[randomDate.getMonth() - 1]
  // } ${randomDate.getDate()}, ${randomDate.getFullYear()}`;
  // // example essay
  // let essays = [
  //   {
  //     id: "15236",
  //     title: "My first essay title",
  //     date: datestring,
  //     status: "Complete",
  //     type: "Academic",
  //     promptTitle: [
  //       "This first prompt very very long long I'm gonna make it super long so I can test elipse",
  //       "Next prompt title",
  //     ],
  //   },
  //   {
  //     id: "52368",
  //     title: "My second some title",
  //     date: datestring,
  //     status: "Pending",
  //     type: "General",
  //     promptTitle: ["Some of my prompts"],
  //   },
  //   {
  //     id: "23451",
  //     title: "My second some title",
  //     date: datestring,
  //     status: "Pending",
  //     type: "General",
  //     promptTitle: ["Some of my prompts"],
  //   },
  // ];
  // res.render("student/dashboard", {
  //   title: "Dashboard",
  //   username: req.user ? req.user.username : "",
  //   essays: essays,
  // });
};

module.exports.displayTestYourselfCustomization = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  console.log("displaying testyourself page!");
  res.render("student/test-yourself-customization", {
    username: req.user ? req.user.username: '',
    title: "test-yourself",
    message: "",
  });
};

module.exports.processTestYourselfCustomization = (req, res, next) => {
  console.log(req.body);

  if (!req.user) {
    return res.redirect("/login");
  }

  if (req.body.part) {
    if (req.body.part.length == 1) {
      StudentPrompts.find(
        {
          isTask1: req.body.part == "1",
          isAcademic: req.body.type === "academic",
        },
        (err, prompts) => {
          if (err) {
            console.log(err);
            res.end(err);
          }
          let promptIndex1 = Math.floor(Math.random() * prompts.length);
          console.log(`${promptIndex1}/${prompts.length}`);
          console.log(prompts[promptIndex1]._id.toString());

          res.render("student/test-yourself-single", {
            username: req.user ? req.user.username: '',
            title: "test-yourself",
            time: req.body.part == "1" ? 20 : 40,
            part: req.body.part,
            type: req.body.type,
            body: prompts[promptIndex1].promptMessage,
            image: prompts[promptIndex1].imageUrl,
            promptId: prompts[promptIndex1]._id.toString(),
            // if accessibility mode is on, value is 'on' otherwise null
            accessibilityMode: req.body.accessibility,
          });
        }
      );
    } else {
      StudentPrompts.find(
        { isAcademic: req.body.type === "academic" },
        (err, prompts) => {
          if (err) {
            console.log(err);
            res.end(err);
          }
          // TODO: display all the submitted essays
          let task1s = [];
          let task2s = [];
          prompts.forEach((p) => {
            if (p.task === 1) {
              task1s.push(p);
            } else {
              task2s.push(p);
            }
          });
          let promptIndex1 = Math.floor(Math.random() * task1s.length);
          let promptIndex2 = Math.floor(Math.random() * task2s.length);
          console.log("rendering testyourself");
          res.render("student/test-yourself-multiple", {
            username: req.user ? req.user.username: '',
            title: "test-yourself",
            time: 60,
            part: req.body.part,
            type: req.body.type,
            body1: prompts[promptIndex1].promptMessage,
            body2: prompts[promptIndex2].promptMessage,
            image: prompts[promptIndex1].imageUrl,
            prompt1Id: prompts[promptIndex1]._id.toString(),
            prompt2Id: prompts[promptIndex2]._id.toString(),
            // if accessibility mode is on, value is 'on' otherwise null
            accessibilityMode: req.body.accessibility,
          });
        }
      );
    }
  }
};

module.exports.submitEssays = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  console.log(req.body);

  let essay1 = {
    studentID: req.user._id,
    status: "pending",
    wordCount: req.body.wordCount1,
    IELTSType: req.body.type,
    promptId: req.body.promptId,
    essayBody: req.body.task1Writing,
    essayPart: 1,
  };

  let essay2 = {
    studentID: req.user._id,
    status: "pending",
    wordCount: req.body.wordCount2,
    IELTSType: req.body.type,
    promptId: req.body.prompt2Id,
    essayBody: req.body.task2Writing,
    essayPart: 2,
  };
  Essays.create(essay1, (err, data) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
  });
  Essays.create(essay2, (err, data) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
  });
  res.redirect("/student/dashboard");

  // if (req.body.part.length == 1) {
  //   res.render("student/test-yourself-single", {
  //     title: "test-yourself",
  //     time: req.body.part == '1' ? 20 : 40
  //   });
  // } else if (req.body.part.length > 1) {
  //   res.render("student/test-yourself-multiple", {
  //     title: "test-yourself",
  //     time: 60
  //   });
  // }
};

module.exports.submitSingleEssay = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  let essay = {
    studentID: req.user._id,
    status: "pending",
    wordCount: req.body.wordCount,
    IELTSType: req.body.type,
    promptId: req.body.promptId,
    essayBody: req.body.taskWriting,
    essayPart: req.body.part,
  };
  console.log("Essay: \n", essay);

  Essays.create(essay, (err, data) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
  });
  res.redirect("/student/dashboard");

  // res.render("student/test-yourself-complete", {
  //   title: "test-yourself",
  //   time: req.body.part == "1" ? 20 : 40,
  // });

  // if (req.body.part.length == 1) {
  //   res.render("student/test-yourself-single", {
  //     title: "test-yourself",
  //     time: req.body.part == '1' ? 20 : 40
  //   });
  // } else if (req.body.part.length > 1) {
  //   res.render("student/test-yourself-multiple", {
  //     title: "test-yourself",
  //     time: 60
  //   });
  // }
};

module.exports.displayTestYourselfSingle = (req, res, next) => {
  res.render("student/test-yourself-single", {
    username: req.user ? req.user.username: '',
    title: "test-yourself",
  });
};

module.exports.displayTestYourselfMultiple = (req, res, next) => {
  res.render("student/test-yourself-multiple", {
    username: req.user ? req.user.username: '',
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
    correctedBody:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  // example essay
  let essay = {
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
