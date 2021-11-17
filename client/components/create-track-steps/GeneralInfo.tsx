import React from 'react'
import {Grid, TextField} from '@material-ui/core'
import {UseInputReturnType} from '../../hooks/useInput'

interface GeneralInfoProps {
    name: UseInputReturnType;
    artist: UseInputReturnType;
    text: UseInputReturnType;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({name, artist, text}) => {
    return (
        <Grid container direction={"column"} style={{padding: 20}}>
            <TextField
                {...name}
                style={{marginTop: 10}}
                label={"Название трека"}
            />
            <TextField
                {...artist}
                style={{marginTop: 10}}
                label={"Имя исполнителя"}
            />
            <TextField
                {...text}
                style={{marginTop: 10}}
                label={"Слова к треку"}
                multiline
                rows={3}
            />
        </Grid>
    )
}

export default GeneralInfo
