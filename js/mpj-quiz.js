(function($) {

  console.log('$',$);


  $("#quiz-start").on('click', function(e) {
    e.preventDefault();
    $("#quiz-intro").addClass("d-none");
    $("#quiz-question").removeClass("d-none");
    nextQuestion()
  });




  var quiz = null,
      debriefs = null,
      quizQuestion = null,
      quizAnswers = null,
      quizProgress = null,
      questionsCount = 0,
      questionsDone = 0,
      maxScoreChange = 0,
      maxScoreFrein = 0,
      userScoreChange = 0,
      userScoreFrein = 0
    ;

  getQuiz(function() {
    $("#quiz-intro").removeClass("d-none");
    quizQuestion = $("#quiz-question .question");
    quizAnswers =$("#quiz-question .quiz-answers li");
    quizProgress=$("#quiz-question .progress-bar");

    quizAnswers.find("a").each(function() {
      $(this).on('click', function(e) {
        e.preventDefault();
        quizAnswers.find('.active').removeClass('active');
        var $element = $(this);
        $element.addClass('active');
        setTimeout(function() {
          endQuestion( $element )
        },200)

      })
    })
  })



  function getQuiz(then) {
    $.getJSON(cfg.quizUrl, function(json) {
      quiz = json.questions;
      debriefs = json.debriefs;
      for (var i=0;i<quiz.length;i++) {
        quiz[i].score_change = 0;
        quiz[i].score_frein = 0;
        for (var j=0;j<quiz[i].questions.length;j++) {
          questionsCount ++;
          quiz[i].questions[j].done = false;
          quiz[i].questions[j].score_change = 0;
          quiz[i].questions[j].score_frein = 0;
          for (var k=0;k<quiz[i].questions[j].propositions.length;k++) {
            quiz[i].questions[j].propositions[k].picked = false;
            maxScoreFrein += quiz[i].questions[j].propositions[k].score_frein;
            maxScoreChange += quiz[i].questions[j].propositions[k].score_change;
          }
        }
      }
      console.log('quizModel', quiz)
      console.log('maxScoreFrein', maxScoreFrein, 'maxScoreChange', maxScoreChange)
      then();
    });
  }

  function setProgress() {
    quizProgress.css('width', (questionsDone/questionsCount*100) + "%")
  }
  function getQuestion() {
    for (var i=0;i<quiz.length;i++) {
      for (var j=0;j<quiz[i].questions.length;j++) {
        if (  quiz[i].questions[j].done === false) {
          return quiz[i].questions[j];
        }
      }
    }
    return false;
  }
  function nextQuestion() {
    var question = getQuestion();
    setProgress();
    if (question == false) {
      endQuiz();
      return;
    }
    quizQuestion.text( question.title);
    quizAnswers.find('.active').removeClass('active')
    for (var i=0;i<question.propositions.length;i++) {
      quizAnswers.eq(i).find('span').text(question.propositions[i].title)
    }
  }

  function displayQuestion() {

  }

  function endQuestion(element) {
    console.log(element.parent().index());
    var question = getQuestion(), index = element.parent().index();
    question.propositions[index].picked = true;
    question.score_frein = question.propositions[index].score_frein;
    question.score_change = question.propositions[index].score_change;
    userScoreChange += question.propositions[index].score_change;
    userScoreFrein += question.propositions[index].score_frein;
    question.done = true;
    questionsDone ++;
    console.log(questionsDone,"/", questionsCount)
    console.log('quiz', quiz)
    nextQuestion()
  }

  function endQuiz() {
    console.log('end quiz');
    // set theme scores
    var userScoreChange2 = 0, userScoreFrein2 = 0;
    for (var i=0;i<quiz.length;i++) {
      for (var j=0;j<quiz[i].questions.length;j++) {
        quiz[i].score_frein += quiz[i].questions[j].score_frein;
        quiz[i].score_change += quiz[i].questions[j].score_change;
        userScoreChange2 +=quiz[i].questions[j].score_change
        userScoreFrein2 +=quiz[i].questions[j].score_frein
      }
    }
    console.log("final", quiz);
    console.log("debriefs", debriefs);
    var debriefChange = "";
    for(var i=0;i<debriefs.change.length;i++) {
      if ( userScoreChange >= debriefs.change[i].min && userScoreChange < debriefs.change[i].max) {
        debriefChange = debriefs.change[i].text;
      }
    }
    var debriefFrein = [];
    var map = {
      "Le cadre":"cadre",
      "Le Désir":"desir",
      "Le secteur":"secteur"
    }
    for (var name in debriefs.frein) {
      console.log("theme", name, debriefs.frein[name].theme);
      for (var i=0;i<quiz.length;i++) {
        var x = map[quiz[i].title];

        $("#quiz-scores").find('#quiz-score-' + x).find('.change').text(quiz[i].score_change)
        $("#quiz-scores").find('#quiz-score-' + x).find('.frein').text(quiz[i].score_frein)
        if (quiz[i].title == debriefs.frein[name].theme && quiz[i].score_frein>=debriefs.frein[name].min) {
          debriefFrein.push(debriefs.frein[name].text);
        }
      }
    }
    console.log('userScoreChange2',userScoreChange2,userScoreChange)
    console.log('userScoreFrein2',userScoreFrein2,userScoreFrein)
    $("#quiz-scores").find('#quiz-score-total').find('.change').text(userScoreChange)
    $("#quiz-scores").find('#quiz-score-total-pct').find('.change').text((Math.round(userScoreChange/maxScoreChange*100))+ "%")

    $("#quiz-scores").find('#quiz-score-total').find('.frein').text(userScoreFrein)
    $("#quiz-scores").find('#quiz-score-total-pct').find('.frein').text((Math.round(userScoreFrein/maxScoreFrein*100))+ "%")

    //debriefFrein = debriefFrein.join('')
    $("#quiz-question").addClass("d-none");
    $("#quiz-conclusion").removeClass('d-none');


    $("#quiz-debrief-change").html(debriefChange);
    $("#quiz-debrief-frein").html(debriefFrein.join('<br>'));
  }



})(jQuery)
