// React imports
import React from 'react'

// Core components
import {
    Hero,
    HeroBanner,
    ScoreCard,
    ChannelValue,
} from '@pxblue/react-components/core'
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core'

// Colors
import * as Colors from '@pxblue/colors'
import * as ColorBrands from '@pxblue/colors-branding'

// Icons
import { Temp, Moisture, Flow, GasCylinder } from '@pxblue/icons-mui'
import {
    MoreVert,
    ChevronRight,
    NotificationsActive,
    Notifications,
    Info,
    CloudCircle,
} from '@material-ui/icons'

// File Imports
import Substations from '../Data/Substations.json'
import Classes from './Substation.module.css'
import backgroundImage from '../Styles/Images/texture.jpg'
import { Labels, Defaults } from '../Data/Constants'

// Constant which returns the footer part of the Scorecard
const footer = (
    <List>
        <ListItem>
            <ListItemText primary={Labels.Location} />
            <ListItemSecondaryAction>
                {' '}
                <ChevronRight />{' '}
            </ListItemSecondaryAction>
        </ListItem>
    </List>
)

// Constants which helps in re-using of the icons used in designing the Card
const Config = {
    temperature: {
        icon: <Temp fontSize={'inherit'} htmlColor={Colors.black[500]} />,
        units: '°F',
        label: Labels.Temperature,
    },
    humidity: {
        icon: <Moisture fontSize={'inherit'} htmlColor={Colors.blue[200]} />,
        units: '%',
        label: Labels.Humidity,
    },
    flow: {
        icon: <Flow fontSize={'inherit'} htmlColor={Colors.black[300]} />,
        units: 'KSCFH',
        label: Labels.Flow,
    },
    volume: {
        icon: (
            <GasCylinder fontSize={'inherit'} htmlColor={Colors.black[500]} />
        ),
        units: 'KSCF',
        label: Labels.Volume,
    },
    alarm: {
        icon: <NotificationsActive />,
        fontSize: 22,
        color: ColorBrands.crimson['600'],
    },
    alarms: {
        icon: <Notifications />,
        fontSize: 22,
        color: Colors.black['400'],
    },
    event: {
        icon: <Info />,
        fontSize: 22,
    },
    status: {
        icon: <CloudCircle />,
        fontSize: 22,
        color: Colors.black['400'],
    },
}

export default function Substation() {
    return Substations.map((item, index) => {
        // Constants defined to reuse it for conditional rendering of contents in the Card
        const isTemperature = item['values']['temperature'] ? true : false
        const isAlarm = item.alarmCount > 0 ? true : false
        const isEvent = item.eventCount > 0 ? true : false
        return (
            //  Wrapper div for Card
            <div key={index} className={Classes.card}>
                <ScoreCard
                    headerColor={
                        isAlarm
                            ? ColorBrands.crimson['500']
                            : Colors.lightBlue['400']
                    }
                    headerTitle={item.title}
                    headerSubtitle={item.subtitle}
                    headerInfo={item.deviceCount + Labels.Device}
                    headerBackgroundImage={backgroundImage}
                    headerFontColor={Colors.white[50]}
                    actionItems={[<MoreVert onClick={() => {}} />]}
                    badge={
                        <HeroBanner>
                            {/* Wrapper div for Aligning ChannelValue content as per the mockup */}
                            <div className={Classes.channelContent}>
                                <ChannelValue
                                    {...(isAlarm
                                        ? Config.alarm
                                        : Config.alarms)}
                                    value={
                                        isAlarm
                                            ? item.alarmCount + Labels.Alarm
                                            : Defaults.alarm
                                    }
                                />
                                <ChannelValue
                                    {...Config.event}
                                    value={
                                        isEvent
                                            ? item.eventCount + Labels.Event
                                            : Defaults.event
                                    }
                                    color={
                                        isEvent
                                            ? Colors.lightBlue['500']
                                            : Colors.black['400']
                                    }
                                />
                                <ChannelValue
                                    {...Config.status}
                                    value={item.status}
                                />
                            </div>
                            {/* Wrapper div for Aligning Hero content as per the mockup */}
                            <div className={Classes.heroContent}>
                                <Hero
                                    {...(isTemperature
                                        ? Config.temperature
                                        : Config.flow)}
                                    value={
                                        isTemperature
                                            ? item['values']['temperature']
                                            : item['values']['flow']
                                    }
                                />
                                <Hero
                                    {...(isTemperature
                                        ? Config.humidity
                                        : Config.volume)}
                                    value={
                                        isTemperature
                                            ? item['values']['humidity']
                                            : item['values']['volume']
                                    }
                                />
                            </div>
                        </HeroBanner>
                    }
                    actionRow={footer}
                ></ScoreCard>
            </div>
        )
    })
}
