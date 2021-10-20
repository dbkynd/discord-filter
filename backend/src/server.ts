import cors from 'cors'
import Discord, { Client, Intents } from 'discord.js'
import express from 'express'
import morgan from 'morgan'
import consola from './consola'

const app = express()

app.use(morgan('combined'))
app.use(
  cors({
    origin: process.env.WEB_URL || 'http://localhost:8080',
  }),
)

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
})

client.once('ready', () => {
  consola.info('Discord ready')
})

app.get('/members', async (req, res, next) => {
  try {
    const guild = client.guilds.cache.get('84764735832068096')
    if (!guild) return res.sendStatus(404)
    const array: { member: Discord.GuildMember; tag: string }[] = []
    const members = await guild.members.fetch()
    members.forEach((x) => {
      array.push({ member: x, tag: x.user.tag })
    })
    res.status(200).json(array)
  } catch (e) {
    next(e)
  }
})

app.get('/roles', async (req, res, next) => {
  try {
    const guild = client.guilds.cache.get('84764735832068096')
    if (!guild) return res.sendStatus(404)
    const roles = await guild.roles.fetch()
    res.status(200).json(roles || [])
  } catch (e) {
    next(e)
  }
})

export function connect(): void {
  client.login(process.env.DISCORD_TOKEN)
  app.listen(3000)
  consola.info('Listening on port 3000')
}

export function disconnect(): void {
  client.destroy()
}
