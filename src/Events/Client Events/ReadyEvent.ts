import { Run } from "../../Interfaces/Event";

export const run: Run = async(client) => {
    const memberssize: number = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    const activities: string[] = [
        "la commande help",
        "la version 0.0.1 de EconomyBot",
        `${memberssize} utilisateurs!`,
        `${client.guilds.cache.size} serveurs!`,
      ];
    client.logger.log('\n');
    client.logger.success(`${client.getTag()} is now ready in ${client.guilds.cache.size} guild(s)`);
    client.deploySlashCommands();
    setInterval(function () {
        var actID = Math.floor(Math.random() * Math.floor(activities.length));
        client.user?.setPresence({ activities: [{ name: activities[actID] , type: 'WATCHING'}] })
    }, 15000);
}

export const name: string = 'ready';