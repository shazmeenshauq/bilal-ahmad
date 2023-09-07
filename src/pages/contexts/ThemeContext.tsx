// components/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Define your theme types
type Theme = {
    mode: 'light' | 'dark';
    colors: {
        background: string;
        text: string;
    };
};

const lightTheme: Theme = {
    mode: 'light',
    colors: {
        background: '#ffffff',
        text: '#000000',
    },
};

const darkTheme: Theme = {
    mode: 'dark',
    colors: {
        background: '#000000',
        text: '#ffffff',
    },
};

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
        setTheme(theme.mode === 'light' ? darkTheme : lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
