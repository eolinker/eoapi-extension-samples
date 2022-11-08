const pkgName = "eoapi-extension-samples-vue3";

const data = [
  {
    apiPos: "API路径",
    fieldPos: "person.email",
    type: "银行卡",
    value: "xxxxxxxxxxx",
  },
  {
    apiPos: "请求体",
    fieldPos: "person.email",
    type: "日期",
    value: "1949",
  },
];

const sercurityCheck = () => {
  const serverUrl = window.eo?.getExtensionSettings(`${pkgName}.serverUrl`);
  if (serverUrl) {
    const modal = window.eo.modalService.create({
      nzTitle: "API敏感词",
      nzCancelText: null,
      nzContent: `
      <table>
        <tr>
          <th>API位置</th>
          <th>字段位置</th>
          <th>类型</th>
          <th>值</th>
        </tr>
        ${data.reduce((prev, curr) => {
          return (
            prev +
            `<tr>
              <td>${curr.apiPos}</td>
              <td>${curr.fieldPos}</td>
              <td>${curr.type}</td>
              <td>${curr.value}</td>
            </tr>`
          );
        }, "")}
      </table>
      `,
      nzOnOk() {
        modal.destroy();
      },
    });
  } else {
    const modal = window.eo.modalService.create({
      nzTitle: "跳转设置页配置openDLP服务？",
      nzContent:
        "您还没有配置openDLP服务地址，目前无法使用本插件，是否要跳转到配置页？",
      nzOkText: "跳转配置",
      nzOnOk() {
        // 'http://localhost:4200/#/home/extension/detail?id=eoapi-extension-samples-vue3&name=eoapi-extension-samples-vue3&tab=0'
        window.eo?.navigate(["home/extension/detail"], {
          queryParams: {
            type: "",
            id: pkgName,
            name: pkgName,
            tab: 1,
          },
        });
        modal.destroy();
      },
    });
  }
};

module.exports = {
  sercurityCheck,
};
