import { Command } from "commander"

const program = new Command()

program
    .option('-d', 'Variables para debug', false)
    .option('-p <port>', 'Puerto del servidor', 4000)
    .option('--mode <mode>', 'Especificar el entorno de ejecucion de nuestro servidor', 'development')
    .option('-l, --letter [leter...]', 'specify letter')
program.parse()