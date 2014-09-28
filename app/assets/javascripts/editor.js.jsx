/** @jsx React.DOM */

// http://content.viki.com/44699v/44699v_240p_1312010824.mp4

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
        <input type="submit" value="Load" />
      </form>
    );
  }
});

var App = React.createClass({
  loadVideo: function(params) {
    this.refs.video.getDOMNode().src = params.videoUrl;
    return;
  },

  render: function() {
    return (
      <div className='app'>
        <VideoUrlForm onVideoUrlSubmit={this.loadVideo}/>
        <video className="player" width="320" height="240" ref='video' controls>
        </video>
      </div>
    )
  }
});


React.renderComponent(<App />, document.getElementById('video-container'));
