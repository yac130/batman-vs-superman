 var quiztitle = "";

 var quiz = [
        {
            "question" : "¿Superman y las plantas tienen algo en común?",
            "image" : "/especiales/batman-vs-superman/img/respuesta-1.jpg",
            "choices" : [
                            "Si",
                            "No"
                        ],
            "correct" : "Si",
            "explanation" : "Tanto las células de Superman como las de las plantas transforman la radiación solar en energía para funcionar (fotosíntesis)."            
        },
        {
            "question" : "¿Batman tiene más limitaciones a la hora de pelear?",
            "image" : "/especiales/batman-vs-superman/img/respuesta-2.jpg",
            "choices" : [
                            "Si",
                            "No"
                        ],
            "correct" : "No",
            "explanation" : "Batman es un guerrero, siempre tendrá un plan meticulosamente preparado. Por otro lado Superman es incapaz de usar sus poderes al máximo por temor a dañar a alguien inocente."            
        },
        {
            "question" : "¿Llegar al nivel físico de Batman es cuestión de entrenar algunos años?",
            "image" : "/especiales/batman-vs-superman/img/respuesta-3.jpg",
            "choices" : [
                            "Si",
                            "No"
                        ],
            "correct" : "No",
            "explanation" : "Según Paul Zehr, autor del libro 'Becoming Batman', para llegar a nivel de Batman se necesitan entre 15 a 18 años de trabajo físico. En comparación un atleta olímpico necesita prepararse 10 años."   
        },
        {
            "question" : "¿Puede Superman identificar quién le llama por teléfono?",
            "image" : "/especiales/batman-vs-superman/img/respuesta-4.jpg",
            "choices" : [
                            "Si",
                            "No"
                        ],
            "correct" : "Si",
            "explanation" : "Fue uno de los poderes más extraños del Hombre de Acero en los primeros años del cómic."   
        },
        {
            "question" : "¿Fue el Joker miembro de la familia de Batman?",
            "image" : "/especiales/batman-vs-superman/img/respuesta-5.jpg",
            "choices" : [
                            "Si",
                            "No"
                        ],
            "correct" : "Si",
            "explanation" : "En una historia alternativa Bruce no sobrevive al atentado junto a sus padres Su madre, Martha Wayne pierde la razón y se convierte en el Joker."   
        }     

    ];


 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;

 jQuery(document).ready(function ($) {


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         }
     }

     function nextQuestion() {
         submt = true;
         $('#explanation').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $('#pager').text(' ' + Number(currentquestion + 1) + ' / ' + quiz.length);
         if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
             if ($('#question-image').length == 0) {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
             } else {
                 $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
             }
         } else {
             $('#question-image').remove();
         }
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();


     }


    function processQuestion(choice) {
         if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
             $('.choice').eq(choice).css({
                 'background-color': '#50D943'
             });
             $('#explanation').html('<div class="div-test"> Muy bien!!! <strong></strong> </div> ' + htmlEncode(quiz[currentquestion]['explanation']));
             score++;
         } else {
             $('.choice').eq(choice).css({
                 'background-color': '#D92623'
             });
             $('#explanation').html('<div class="div-test"> Mal!!! <strong></strong> </div> ' + htmlEncode(quiz[currentquestion]['explanation']));
         }
         currentquestion++;
         $('#submitbutton').html('Siguiente').on('click', function () {
             if (currentquestion == quiz.length) {
                 endQuiz();
             } else {
                 $(this).text('Ver').css({
                     'color': '#222'
                 }).off('click');
                 nextQuestion();
             }
         })
     }


     function setupButtons() {
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         })
         $('.choice').on('click', function () {
             picked = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#ffc600'
             });
             if (submt) {
                 submt = false;
                 $('#submitbutton').css({
                     'color': '#000'
                 }).on('click', function () {
                     $('.choice').off('click');
                     $(this).off('click');
                     processQuestion(picked);
                 });
             }
         })
     }


     function endQuiz() {
         $('#explanation').empty();
         $('#question').empty();
         $('#choice-block').empty();
         $('#submitbutton').remove();
         $('#question').text("Acertaste " + score + " de " + quiz.length );
         $(document.createElement('h2')).css({
             'text-align': 'center',
             'font-size': '4em',
             'font-family': 'komika_axisregular'
         }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
         $(document.createElement('a')).addClass('reiniciar-test').css({
             'text-align': 'center',
             'font-size': '4em',
             'font-family': 'komika_axisregular'
         }).text('Reiniciar');
     }


     function init() {
         //add title
         if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
             $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
         } else {
             $(document.createElement('h1')).text("Quiz").appendTo('#frame');
         }

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
             //add pager
             $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('1 / ' + quiz.length).appendTo('#frame');
             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
             //add image if present
             if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
             }
             $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

             //add choices
             addChoices(quiz[0]['choices']);

             //add submit button
             $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Ver').css({                 
                 'padding': '10px 0'
             }).appendTo('#frame');

             setupButtons();
         }
     }

     init();
 });