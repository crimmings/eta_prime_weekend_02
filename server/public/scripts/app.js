$(document).ready(function() {

  /**
   *Global variables
   */
  var etaIndex; // value of eta member in array of eta.json
  var cohort; // save json data into
  var cohortLength; // variable to calculate length

  /**
   *Handlebars
   */
  var compiledHtml = $('#highlight').html();
  var template = Handlebars.compile(compiledHtml);


  /**
   * A function to grab 'data/eta.json' and calculates random number to find initial eta array index.
   */
  function getEta() {
    $.ajax({
      url: '/data/eta.json'
    }).done(function(json) {
      cohort = json;
      cohortLength = cohort.eta.length - 1;
      etaIndex = Math.floor(Math.random() * cohortLength + 1);

      makeEta(etaIndex);
    }); //done
  }; //getEta function

  /**
   * Function adds json data to DOM.
   */
  function makeEta(etaIndex) {
    var templateMake = template(cohort.eta[etaIndex]);
    $('.highlight').fadeOut(300, function() {
      $(this).html(templateMake);
    }).fadeIn(300);
};

  //  html(templateMake);

  getEta();

  /**
   * Click handlers to cycle through eta cohort. Selectors are images.
   */
  $('.buttfwd').on('click', function() {
    etaIndex++;
    if (etaIndex > cohortLength) {
      etaIndex = 0;
    }
    makeEta(etaIndex);
  });

  $('.buttback').on('click', function() {
    etaIndex--;
    if (etaIndex < 0) {
      etaIndex = cohortLength;
    }

    makeEta(etaIndex);
  }); //end of .buttback
}); //document ready
