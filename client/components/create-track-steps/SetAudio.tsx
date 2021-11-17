/**
 * See SetPicture component
 */
import React from 'react';
import {Button} from '@material-ui/core';
import FileUpload from '../FileUpload';

interface SetAudioProps {
    setAudio: React.Dispatch<any>;
}

const SetAudio: React.FC<SetAudioProps> = ({setAudio}) => {
    return (
        <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
        </FileUpload>
    )
}

export default SetAudio
