[0;1;32m●[0m pm2-myha.service - PM2 process manager
   Loaded: loaded (/etc/systemd/system/pm2-myha.service; enabled; vendor preset: enabled)
   Active: [0;1;32mactive (running)[0m since Tue 2020-03-17 19:11:41 UTC; 5s ago
     Docs: https://pm2.keymetrics.io/
  Process: 16932 ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect (code=exited, status=0/SUCCESS)
 Main PID: 16957 (PM2 v4.2.3: God)
    Tasks: 11 (limit: 2361)
   CGroup: /system.slice/pm2-myha.service
           └─16957 PM2 v4.2.3: God Daemon (/home/myha/.pm2)

Mar 17 19:11:41 vidakovic pm2[16932]: [PM2] Resurrecting
Mar 17 19:11:41 vidakovic pm2[16932]: [PM2] Restoring processes located in /home/myha/.pm2/dump.pm2
Mar 17 19:11:41 vidakovic pm2[16932]: [PM2][ERROR] Failed to read dump file in /home/myha/.pm2/dump.pm2
Mar 17 19:11:41 vidakovic pm2[16932]: [PM2] Restoring processes located in /home/myha/.pm2/dump.pm2.bak
Mar 17 19:11:41 vidakovic pm2[16932]: [PM2][ERROR] Failed to read dump file in /home/myha/.pm2/dump.pm2.bak
Mar 17 19:11:41 vidakovic pm2[16932]: [PM2][ERROR] No processes saved; DUMP file doesn't exist
Mar 17 19:11:41 vidakovic pm2[16932]: ┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
Mar 17 19:11:41 vidakovic pm2[16932]: │ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
Mar 17 19:11:41 vidakovic pm2[16932]: └─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
Mar 17 19:11:41 vidakovic systemd[1]: Started PM2 process manager.
