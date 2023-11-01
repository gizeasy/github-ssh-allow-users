const request = require('request');
const { writeFile } = require('fs-extra');

const url = 'https://api.github.com/meta';
const path = '/etc/ssh/ssh_config.d/';
const name = 'allow.conf';

const staticAllow = 'a.izmailov@89.179.126.161 recovery';

const create = () => {
  request.get(
    {
      url: url,
      headers: {
        'User-Agent': 'consta',
      },
    },
    (err, response, body) => {
      if (!err && body) {
        const data = JSON.parse(body);

        const allowIps = [
          //   ...data.hooks,
          //   ...data.web,
          //   ...data.api,
          //   ...data.git,
          //   ...data.github_enterprise_importer,
          //   ...data.packages,
          //   ...data.pages,
          //   ...data.importer,
          //   ...data.dependabot,
          ...data.actions,
        ];

        let allow = `AllowUsers ${staticAllow} `;

        for (let index = 0; index < allowIps.length; index++) {
          allow += `github@${allowIps[index]} `;
        }

        writeFile(`${path}${name}`, allow);
      }
    }
  );
};

create();
