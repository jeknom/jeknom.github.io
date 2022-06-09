import { colorIndices } from '@core/constants';
import { createTheme } from '@core/theme';
import {
    MantineProvider,
    AppShell,
    Header,
    Title,
    Text,
    Container,
    createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        width: 'calc(100% - 260px)',
        maxWidth: 820,
        color: 'white',
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: '100%',
        },
    },
    title: {
        color: theme.colors.orange[colorIndices.ACCENT_COLOR_INDEX],
    },
}));

function App() {
    const { classes } = useStyles();

    return (
        <>
            <MantineProvider theme={createTheme()} withGlobalStyles>
                <AppShell
                    padding="md"
                    header={
                        <Header height={60} p="xs">
                            <Title order={4}>Johannes Palvanen</Title>
                        </Header>
                    }
                >
                    <Container className={classes.root} my={36}>
                        <Text>It&apos;s a me!</Text>
                        <Title>Johannes Palvanen</Title>
                        <Text className={classes.title}>
                            Full Stack Developer
                        </Text>
                    </Container>
                </AppShell>
            </MantineProvider>
        </>
    );
}

export default App;
