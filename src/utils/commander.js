import { Command } from "commander"

const program = new Command()

program
    .option('--mode <mode>', 'Especificar el entorno de ejecucion de nuestro servidor', 'development')

program.parse()

export {
    program
}
