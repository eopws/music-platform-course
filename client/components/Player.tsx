import React, {useEffect} from 'react';
import clsx from 'clsx';
import {Pause, PlayArrow, VolumeUp} from "@material-ui/icons";
import {Button, Grid, IconButton} from "@material-ui/core";
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import TrackVolume from './TrackVolume';
import RevealIcon from '@material-ui/icons/ArrowDropUp';
import CollapseIcon from '@material-ui/icons/ArrowDropDown';

let audio;

const Player = () => {
    const {pause, volume, active, currentTime, collapsed} = useTypedSelector(state => state.player)
    const {tracks} = useTypedSelector(state => state.track)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setActiveTrack, setCollapsed} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
        }
    }, [active])

    useEffect(() => {
        if (pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [active, pause]);

    const setAudio = () => {
        if (active) {
            audio.pause()
            audio.src = 'http://localhost:5000/' + active.audio
            audio.volume = volume / 100
            audio.currentTime = currentTime
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
            audio.onended = () => {
                let nextTrackIndex = tracks.indexOf(active) + 1

                nextTrackIndex = tracks[nextTrackIndex] ? nextTrackIndex : 0

                setActiveTrack(tracks[nextTrackIndex])
            }
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    return (
        <div className={clsx({[styles.player]: true, [styles.player_collapsed]: collapsed})}>
            <Button
                className={styles['collapse-btn']}
                variant="contained"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed
                    ? <RevealIcon />
                    : <CollapseIcon />
                }
            </Button>

            <IconButton onClick={() => pause ? playTrack() : pauseTrack()}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>

            <img className={styles['track-picture']} src={'http://localhost:5000/' + active?.picture} />

            <Grid container direction="column" style={{width: 200, margin: '0 20px 0 10px'}}>
                <div>{active?.name || 'track'}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist || 'artist'}</div>
            </Grid>
            <TrackProgress left={currentTime} right={active?.duration || 0} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackVolume left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;
