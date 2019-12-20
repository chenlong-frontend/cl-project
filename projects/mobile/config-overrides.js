const { injectBabelPlugin } = require('react-app-rewired');
const bodyParser = require('body-parser');

module.exports = {
    webpack: function(config, env) {
        config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
        // css-modules
        config.module.rules[1].oneOf.unshift(
            {
                test: /\.css$/,
                exclude: /node_modules|antd-mobile|font-awesome.min\.css/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]'
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ]
            }
        );
        return config;
    },
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.before = (app) => {
                app.use(bodyParser.urlencoded({ extended: false }));
                app.use(bodyParser.json());
                app.use('', require('./mock/index'))
            };
            return config;
        }
    }
};
