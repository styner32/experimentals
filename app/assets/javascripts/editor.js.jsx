/** @jsx React.DOM */

// http://content.viki.com/44699v/44699v_240p_1312010824.mp4
// http://x1.vikiassets.com/waveforms/c90ae0568f91df5583ff7fd8bf460512c5c212bb.json

var VideoUrlForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var videoUrl = this.refs.videoUrl.getDOMNode().value.trim();
    if (!videoUrl) {
      return;
    }
    this.props.onVideoUrlSubmit({videoUrl: videoUrl});
    this.refs.videoUrl.getDOMNode().value = '';
    return;
  },

  render: function() {
    return (
      <form className="videoUrlForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Video Url" ref="videoUrl"/>
        <input type="submit" value="Load Video" />
      </form>
    );
  }
});

var WaveformUrlForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var waveformUrl = this.refs.waveformUrl.getDOMNode().value.trim();
    if (!waveformUrl) {
      return;
    }
    this.props.onWaveformUrlSubmit({waveformUrl: waveformUrl});
    this.refs.waveformUrl.getDOMNode().value = '';
    return;
  },

  render: function() {
    return (
      <form className="waveformUrlForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Waveform Url" ref="waveformUrl"/>
        <input type="submit" value="Load Waveform" />
      </form>
    );
  }
});

var Waveform = React.createClass({
  render: function() {
    new Waveform({
        container: this.refs.waveform.getDOMNode(),
        innerColor: "blue",
        outerColor: "gray",
        data: data,
        width: data.length,
        height: 50});
    return (
      <div className="waveform" ref='waveform'></div>
    );
  }
});

var App = React.createClass({
  loadVideo: function(params) {
    this.refs.video.getDOMNode().src = params.videoUrl;
    return;
  },

  loadWaveform: function(params) {
    var url = params.waveformUrl;
    $.ajax({
      url: url,
      type: 'GET',
      async: false,
      jsonpCallback: "parseResponse",
      contentType: "application/json",
      dataType: 'jsonp'
    }).done(function( data ) {

    });
    return;
  },

  getInitialState: function() {
    return {waveformData: []};
  },

  render: function() {
    return (
      <div className='app'>
        <VideoUrlForm onVideoUrlSubmit={this.loadVideo}/>
        <WaveformUrlForm onWaveformUrlSubmit={this.loadWaveform}/>
        <video className="player" width="320" height="240" ref='video' controls></video>
        <Waveform data={this.state.waveformData} />
      </div>
    )
  }
});


React.renderComponent(<App />, document.getElementById('video-container'));
