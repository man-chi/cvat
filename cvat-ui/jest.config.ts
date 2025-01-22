import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^reducers': '<rootDir>/src/reducers',
        '^actions/(.*)': '<rootDir>/src/actions/$1',
        '^components/(.*)': '<rootDir>/src/components/$1',
        '^utils/(.*)': '<rootDir>/src/utils/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^antd/lib/(.*)$': 'antd/lib/$1',
        '^@ant-design/(.*)$': '@ant-design/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
                isolatedModules: true,
                jsx: 'react',
            },
        ],
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.svg$': 'jest-transform-stub',
    },
    transformIgnorePatterns: ['node_modules/(?!(antd|@ant-design|rc-.*|@babel/runtime)/)'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

export default config;
