const yargs = require("yargs");

const argv = yargs
    .option({
        i: {
            demand: true,
            alias: "initialcurrency",
            describe: "Inital Currency",
        },
        f: {
            demand: true,
            alias: "finalcurrency",
            describe: "Final Currency",
        },
        a: {
            demand: true,
            alias: "amount",
            describe: "Amount",
        }

    })
    .help()
    .alias("help", "h")
    .argv;

module.exports = argv;