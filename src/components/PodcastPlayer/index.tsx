import * as React from 'react'
import AudioPlayer from 'react-h5-audio-player'

// import FeedIcon from '../../../images/feed.svg'
import BackIcon from '../../../images/chevron-back-outline.svg'
import ForwardIcon from '../../../images/chevron-forward-outline.svg'
import 'react-h5-audio-player/src/styles.scss'
import './styles.scss'

interface IProps {
    podcasts?: Array<any>
    loading?: boolean
}

interface IState {
    index: number
}

export default class Card extends React.Component<IProps, IState> {
    static defaultProps = {}
    state = {
        index: 0,
    }

    player = React.createRef()

    constructor(props: IProps) {
        super(props)
    }

    selectPodcast(index: number, evt) {
        console.log(evt)
        evt.stopPropagation()
        evt.preventDefault()
        this.setState({ index })
    }

    onBack() {
        const { index } = this.state
        const { podcasts } = this.props
        let backIndex = index - 1
        if (backIndex < 0) {
            backIndex = podcasts.length - 1
        }
        this.setState({
            index: backIndex,
        })
    }

    onForward() {
        const { index } = this.state
        const { podcasts } = this.props
        let nextIndex = index + 1
        if (nextIndex >= podcasts.length) {
            nextIndex = 0
        }
        this.setState({
            index: nextIndex,
        })
    }

    render() {
        const { loading, podcasts } = this.props
        const { index } = this.state
        const selectedPodcast = podcasts[index]
        if (loading) {
            return []
        }
        return (
            <div className="player-card">
                <div className="player">
                    <div className="player-nav-arrows">
                        <button
                            className="player-nav-arrows-left"
                            onClick={this.onBack.bind(this)}
                        >
                            <img src={BackIcon} height={20} />
                        </button>
                        <button className="player-nav-arrows-right">
                            <img
                                src={ForwardIcon}
                                height={20}
                                onClick={this.onForward.bind(this)}
                            />
                        </button>
                    </div>
                    <div className="player-cover-art">
                        <img
                            draggable={false}
                            height={450}
                            width={450}
                            src={selectedPodcast.image}
                        />
                    </div>
                    <div className="player-bottom">
                        <div className="player-carousel">
                            {podcasts.map((podcast, i) => (
                                <button
                                    aria-label={podcast.title}
                                    key={`${i}`}
                                    className={`player-carousel-item ${
                                        i === index ? 'selected' : ''
                                    }`}
                                    onClick={this.selectPodcast.bind(this, i)}
                                ></button>
                            ))}
                        </div>
                        <div className="player-media-controls">
                            <AudioPlayer
                                header={
                                    <div className="player-info">
                                        <div className="player-show-title">
                                            <b>{selectedPodcast.title}</b>
                                        </div>
                                        <p>
                                            {
                                                selectedPodcast.datePublishedPretty
                                            }
                                        </p>
                                    </div>
                                }
                                autoPlay={false}
                                src={selectedPodcast.enclosureUrl}
                                onPlay={(e) => console.log('onPlay')}
                                showJumpControls={false}
                                customIcons={{ forward: null, rewind: null }}
                                customAdditionalControls={[
                                    <a
                                        className="player-feed-button"
                                        // href={}
                                        style={{ width: 30 }}
                                    >
                                        {/* <img src={FeedIcon} /> */}
                                    </a>,
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}