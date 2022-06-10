import { colorIndices } from '@core/constants';
import { createTheme } from '@core/theme';
import {
    MantineProvider,
    AppShell,
    Header,
    Title,
    Container,
    createStyles,
    Avatar,
    Transition,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        width: 'calc(100% - 260px)',
        maxWidth: 820,
        color: 'white',
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: '100%',
        },
    },
    greeting: {
        minHeight: theme.spacing.sm,
    },
    name: {
        fontSize: '5em',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            fontSize: '3em',
        },
    },
    title: {
        position: 'absolute',
        color: theme.colors.orange[colorIndices.ACCENT_COLOR_INDEX],
    },
}));

const titles = [
    'Full Stack Developer',
    'Game Developer',
    'A great guy',
    'Welcome to my portfolio!',
];

function App() {
    const { classes } = useStyles();
    const [titleIndex, setTitleIndex] = useState(0);
    const interval = useInterval(() => {
        setTitleIndex((ti) => (ti === titles.length - 1 ? 0 : ti + 1));
    }, 2000);

    const titleTransitions = titles.map((greeting, index) => (
        <Transition
            key={index}
            mounted={index === titleIndex}
            transition="skew-up"
            duration={400}
            timingFunction="ease"
        >
            {(styles) => (
                <Title style={styles} className={classes.title} order={2}>
                    {greeting}
                </Title>
            )}
        </Transition>
    ));

    useEffect(() => {
        interval.start();
        return interval.stop;
    }, []);

    return (
        <>
            <MantineProvider theme={createTheme()} withGlobalStyles>
                <AppShell
                    padding="md"
                    header={
                        <Header height={60} p="xs">
                            <Avatar>JP</Avatar>
                        </Header>
                    }
                >
                    <Container className={classes.root} my={128}>
                        <Title order={3}>It&apos;s a me</Title>
                        <Title className={classes.name}>
                            Johannes Palvanen
                        </Title>
                        <Container className={classes.greeting} px={0}>
                            {titleTransitions}
                        </Container>
                    </Container>
                </AppShell>
            </MantineProvider>
        </>
    );
}

export default App;
