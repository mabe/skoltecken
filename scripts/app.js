(function() {
  var subjects = [
    { key: 'matte', name: 'Matte' },
    { key: 'fysik', name: 'Fysik' },
    { key: 'kemi', name: 'Kemi' },
    { key: 'biologi', name: 'Biologi' },
    { key: 'geografi', name: 'Geografi' },
    { key: 'historia', name: 'Historia' },
  ];

  var words = [
    { key: 'avrunda', subject: 'matte', name: 'Avrunda, Avrundning', youtube: 'Ty9nEHq_SZo' },
    { key: 'avstand', subject: 'matte', name: 'Avstånd', youtube: 'lnvy1gpZa7M' },
    { key: 'kort', subject: 'matte', name: 'Kort, Kortare, Kortast', youtube: 'lnvy1gpZa7M' }
  ];

  var Root = Backbone.View.extend({
    template: '<h1 style="text-align: center;"><a href="#school">Välkommen</a></h1>',
    render: function() {
      this.$el = $(this.template);
      return this;
    }
  });

  var School = Backbone.View.extend({
    template: _.template(document.getElementById('view-school').innerText),
    initialize: function() {
      this.$el = $(this.template({ subjects: subjects }));
    },
    render: function () {
      return this;
    }
  });

  var Subject = Backbone.View.extend({
    template: _.template(document.getElementById('view-subject').innerText),
    initialize: function (s) {
      var view = this;
      var items = _.filter(words, function(w) { return w.subject === s; });

      view.$el = $(this.template({ words: items }));
      view.$modal = this.$el.filter('#video-modal');
      view.$iframe = this.$modal.find('iframe');

      view.$el.on('click', '.link', function(e) {
        var width = $(document.body).width(),
          aspectRatio = view.$iframe.height() / view.$iframe.width()

          if (width > 600) {
            width = 600;
          }

        view.$iframe.attr('src', 'http://www.youtube.com/embed/' + $(this).data('youtube') + '?rel=0');
        view.$iframe.attr('height', width * aspectRatio);
        view.$iframe.attr('width', width);
      });
      view.$modal.on('show.bs.modal', function () {
      });
      view.$modal.on('hide.bs.modal', function () {
        view.$iframe.attr('src', '');
      });
    }
  });

  var Router = Backbone.Router.extend({
    routes: {
      '': 'root',
      'school': 'school',
      'school/:subject': 'subject'
    },
    initialize: function() {
      Backbone.history.start();
      return this;
    },
    root: function() {
      this.setView(new Root());
      return this;
    },
    school: function () {
      this.setView(new School());
      return this;
    },
    subject: function (subject) {
      this.setView(new Subject(subject));
      return this;
    },
    setView: function(view) {
      if (this.view) {
        this.view.remove();
      }
      this.view = view;

      $('#app').append(this.view.render().$el);
    }
  });

  window.app = new Router();
}());
