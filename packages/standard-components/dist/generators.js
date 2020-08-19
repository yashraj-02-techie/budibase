const headers = () => [
  {
    name: "common/H1",
    description: "Header 1",
    inherits: "@budibase/standard-components/text",
    props: {
      font: "20pt",
    },
  },
  {
    name: "common/H2",
    description: "Header 2",
    inherits: "@budibase/standard-components/text",
    props: {
      font: "15pt",
    },
  },
  {
    name: "common/H3",
    description: "Header 3",
    inherits: "@budibase/standard-components/text",
    props: {
      font: "12pt bold",
    },
  },
  {
    name: "common/H4",
    description: "Header 4",
    inherits: "@budibase/standard-components/text",
    props: {
      font: "10pt bold",
    },
  },
]

const forms = ({ records, indexes }) => [...headers(), ...records.map(root)]

const root = record => ({
  name: `${record.name} Form`,
  description: `All fields on record '${record.nodeKey()}' `,
  inherits: "@budibase/standard-components/stackpanel",
  props: {
    direction: "vertical",
    children: [
      {
        control: {
          _component: "common/H1",
          value: `Edit ${record.name}`,
        },
      },
      form(record),
      saveCancelButtons(record),
    ],
  },
})

const form = record => ({
  control: {
    _component: "@budibase/standard-components/form",
    formControls: record.fields.map(f => ({
      label: f.label,
      control: {
        _component: "@budibase/standard-components/textbox",
        value: {
          "##bbstate": `current${record.name}.${f.name}`,
          "##bbsource": "store",
        },
      },
    })),
  },
})

const saveCancelButtons = record => ({
  control: {
    _component: "@budibase/standard-components/stackpanel",
    direction: "horizontal",
    children: [
      paddedPanelForButton({
        _component: "common/Primary Button",
        contentText: `Save ${record.name}`,
        onClick: [
          {
            "##eventHandlerType": "Save Record",
            parameters: {
              statePath: `current${record.name}`,
            },
          },
        ],
      }),
      paddedPanelForButton({
        _component: "common/Secondary Button",
        contentText: `Cancel`,
        onClick: [
          {
            "##eventHandlerType": "Save Record",
            parameters: {
              statePath: `current${record.name}`,
            },
          },
        ],
      }),
    ],
  },
})

const paddedPanelForButton = button => ({
  control: {
    _component: "@budibase/standard-components/panel",
    padding: "20px",
    component: button,
  },
})

const indexTables = ({ indexes, helpers }) =>
  indexes
    .filter(i => i.parent().type === "root")
    .map(i => indexTable(i, helpers))

const indexTableProps = (index, helpers) => ({
  data: {
    "##bbstate": index.nodeKey(),
    "##bbsource": "store",
  },
  columns: helpers.indexSchema(index).map(column),
})

const indexTable = (index, helpers) => ({
  name: `tables/${index.name} Table`,
  inherits: "@budibase/standard-components/table",
  props: indexTableProps(index, helpers),
})

const column = col => ({
  title: col.name,
  value: {
    "##bbstate": col.name,
    "##bbsource": "context",
  },
})

const nav = ({ records, indexes, helpers }) => [
  {
    name: "Application Root",
    inherits: "@budibase/standard-components/nav",
    props: {
      items: indexes.filter(i => i.parent().type === "root").map(navItem),
      selectedItem: {
        "##bbstate": "selectedNav",
        "##bbstatefallback": records[0].collectionName,
        "##bbsource": "store",
      },
    },
  },
  ...indexTables({ records, indexes, helpers }),
]

const navItem = index => ({
  title: index.name,
  component: {
    _component: `tables/${index.name} Table`,
  },
})

const app = params => {
  return [...nav(params), ...forms(params)]
}

const buttons = () => [
  {
    name: "common/Primary Button",
    description: "a styled button",
    inherits: "@budibase/standard-components/button",
    props: {
      padding: "5px 7px",
      border: "1px solid #EEE",
      color: "#5F6368",
      background: "##f2f2f2",
      hoverColor: "black",
      hoverBackground: "#cccccc",
    },
  },
  {
    name: "common/Secondary Button",
    description: "a styled button",
    inherits: "@budibase/standard-components/button",
    props: {
      padding: "5px 7px",
      border: "1px solid #EEE",
      color: "#5F6368",
      background: "##f2f2f2",
      hoverColor: "black",
      hoverBackground: "#cccccc",
    },
  },
]

export { app, buttons, forms, headers, indexTables, nav }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdG9ycy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2dlbmVyYXRvcnMvaGVhZGVyc0dlbmVyYXRvci5qcyIsIi4uL3NyYy9nZW5lcmF0b3JzL2Zvcm1zR2VuZXJhdG9yLmpzIiwiLi4vc3JjL2dlbmVyYXRvcnMvaW5kZXhUYWJsZXNHZW5lcmF0b3IuanMiLCIuLi9zcmMvZ2VuZXJhdG9ycy9uYXZHZW5lcmF0b3IuanMiLCIuLi9zcmMvZ2VuZXJhdG9ycy9hcHBHZW5lcmF0b3IuanMiLCIuLi9zcmMvZ2VuZXJhdG9ycy9idXR0b25zR2VuZXJhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBoZWFkZXJzID0gKCkgPT4gW1xuICB7XG4gICAgbmFtZTogXCJjb21tb24vSDFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJIZWFkZXIgMVwiLFxuICAgIGluaGVyaXRzOiBcIkBidWRpYmFzZS9zdGFuZGFyZC1jb21wb25lbnRzL3RleHRcIixcbiAgICBwcm9wczoge1xuICAgICAgZm9udDogXCIyMHB0XCIsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY29tbW9uL0gyXCIsXG4gICAgZGVzY3JpcHRpb246IFwiSGVhZGVyIDJcIixcbiAgICBpbmhlcml0czogXCJAYnVkaWJhc2Uvc3RhbmRhcmQtY29tcG9uZW50cy90ZXh0XCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIGZvbnQ6IFwiMTVwdFwiLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNvbW1vbi9IM1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkhlYWRlciAzXCIsXG4gICAgaW5oZXJpdHM6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvdGV4dFwiLFxuICAgIHByb3BzOiB7XG4gICAgICBmb250OiBcIjEycHQgYm9sZFwiLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNvbW1vbi9INFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkhlYWRlciA0XCIsXG4gICAgaW5oZXJpdHM6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvdGV4dFwiLFxuICAgIHByb3BzOiB7XG4gICAgICBmb250OiBcIjEwcHQgYm9sZFwiLFxuICAgIH0sXG4gIH0sXG5dXG4iLCJpbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSBcIi4vaGVhZGVyc0dlbmVyYXRvclwiXG5cbmV4cG9ydCBjb25zdCBmb3JtcyA9ICh7IHJlY29yZHMsIGluZGV4ZXMgfSkgPT4gW1xuICAuLi5oZWFkZXJzKHsgcmVjb3JkcywgaW5kZXhlcyB9KSxcbiAgLi4ucmVjb3Jkcy5tYXAocm9vdCksXG5dXG5cbmNvbnN0IHJvb3QgPSByZWNvcmQgPT4gKHtcbiAgbmFtZTogYCR7cmVjb3JkLm5hbWV9IEZvcm1gLFxuICBkZXNjcmlwdGlvbjogYEFsbCBmaWVsZHMgb24gcmVjb3JkICcke3JlY29yZC5ub2RlS2V5KCl9JyBgLFxuICBpbmhlcml0czogXCJAYnVkaWJhc2Uvc3RhbmRhcmQtY29tcG9uZW50cy9zdGFja3BhbmVsXCIsXG4gIHByb3BzOiB7XG4gICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgY29udHJvbDoge1xuICAgICAgICAgIF9jb21wb25lbnQ6IFwiY29tbW9uL0gxXCIsXG4gICAgICAgICAgdmFsdWU6IGBFZGl0ICR7cmVjb3JkLm5hbWV9YCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmb3JtKHJlY29yZCksXG4gICAgICBzYXZlQ2FuY2VsQnV0dG9ucyhyZWNvcmQpLFxuICAgIF0sXG4gIH0sXG59KVxuXG5jb25zdCBmb3JtID0gcmVjb3JkID0+ICh7XG4gIGNvbnRyb2w6IHtcbiAgICBfY29tcG9uZW50OiBcIkBidWRpYmFzZS9zdGFuZGFyZC1jb21wb25lbnRzL2Zvcm1cIixcbiAgICBmb3JtQ29udHJvbHM6IHJlY29yZC5maWVsZHMubWFwKGYgPT4gKHtcbiAgICAgIGxhYmVsOiBmLmxhYmVsLFxuICAgICAgY29udHJvbDoge1xuICAgICAgICBfY29tcG9uZW50OiBcIkBidWRpYmFzZS9zdGFuZGFyZC1jb21wb25lbnRzL3RleHRib3hcIixcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBcIiMjYmJzdGF0ZVwiOiBgY3VycmVudCR7cmVjb3JkLm5hbWV9LiR7Zi5uYW1lfWAsXG4gICAgICAgICAgXCIjI2Jic291cmNlXCI6IFwic3RvcmVcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSkpLFxuICB9LFxufSlcblxuY29uc3Qgc2F2ZUNhbmNlbEJ1dHRvbnMgPSByZWNvcmQgPT4gKHtcbiAgY29udHJvbDoge1xuICAgIF9jb21wb25lbnQ6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvc3RhY2twYW5lbFwiLFxuICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHBhZGRlZFBhbmVsRm9yQnV0dG9uKHtcbiAgICAgICAgX2NvbXBvbmVudDogXCJjb21tb24vUHJpbWFyeSBCdXR0b25cIixcbiAgICAgICAgY29udGVudFRleHQ6IGBTYXZlICR7cmVjb3JkLm5hbWV9YCxcbiAgICAgICAgb25DbGljazogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiIyNldmVudEhhbmRsZXJUeXBlXCI6IFwiU2F2ZSBSZWNvcmRcIixcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgc3RhdGVQYXRoOiBgY3VycmVudCR7cmVjb3JkLm5hbWV9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgcGFkZGVkUGFuZWxGb3JCdXR0b24oe1xuICAgICAgICBfY29tcG9uZW50OiBcImNvbW1vbi9TZWNvbmRhcnkgQnV0dG9uXCIsXG4gICAgICAgIGNvbnRlbnRUZXh0OiBgQ2FuY2VsYCxcbiAgICAgICAgb25DbGljazogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiIyNldmVudEhhbmRsZXJUeXBlXCI6IFwiU2F2ZSBSZWNvcmRcIixcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgc3RhdGVQYXRoOiBgY3VycmVudCR7cmVjb3JkLm5hbWV9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0sXG59KVxuXG5jb25zdCBwYWRkZWRQYW5lbEZvckJ1dHRvbiA9IGJ1dHRvbiA9PiAoe1xuICBjb250cm9sOiB7XG4gICAgX2NvbXBvbmVudDogXCJAYnVkaWJhc2Uvc3RhbmRhcmQtY29tcG9uZW50cy9wYW5lbFwiLFxuICAgIHBhZGRpbmc6IFwiMjBweFwiLFxuICAgIGNvbXBvbmVudDogYnV0dG9uLFxuICB9LFxufSlcbiIsImV4cG9ydCBjb25zdCBpbmRleFRhYmxlcyA9ICh7IGluZGV4ZXMsIGhlbHBlcnMgfSkgPT5cbiAgaW5kZXhlc1xuICAgIC5maWx0ZXIoaSA9PiBpLnBhcmVudCgpLnR5cGUgPT09IFwicm9vdFwiKVxuICAgIC5tYXAoaSA9PiBpbmRleFRhYmxlKGksIGhlbHBlcnMpKVxuXG5leHBvcnQgY29uc3QgaW5kZXhUYWJsZVByb3BzID0gKGluZGV4LCBoZWxwZXJzKSA9PiAoe1xuICBkYXRhOiB7XG4gICAgXCIjI2Jic3RhdGVcIjogaW5kZXgubm9kZUtleSgpLFxuICAgIFwiIyNiYnNvdXJjZVwiOiBcInN0b3JlXCIsXG4gIH0sXG4gIGNvbHVtbnM6IGhlbHBlcnMuaW5kZXhTY2hlbWEoaW5kZXgpLm1hcChjb2x1bW4pLFxufSlcblxuY29uc3QgaW5kZXhUYWJsZSA9IChpbmRleCwgaGVscGVycykgPT4gKHtcbiAgbmFtZTogYHRhYmxlcy8ke2luZGV4Lm5hbWV9IFRhYmxlYCxcbiAgaW5oZXJpdHM6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvdGFibGVcIixcbiAgcHJvcHM6IGluZGV4VGFibGVQcm9wcyhpbmRleCwgaGVscGVycyksXG59KVxuXG5jb25zdCBjb2x1bW4gPSBjb2wgPT4gKHtcbiAgdGl0bGU6IGNvbC5uYW1lLFxuICB2YWx1ZToge1xuICAgIFwiIyNiYnN0YXRlXCI6IGNvbC5uYW1lLFxuICAgIFwiIyNiYnNvdXJjZVwiOiBcImNvbnRleHRcIixcbiAgfSxcbn0pXG4iLCJpbXBvcnQgeyBpbmRleFRhYmxlcyB9IGZyb20gXCIuL2luZGV4VGFibGVzR2VuZXJhdG9yXCJcblxuZXhwb3J0IGNvbnN0IG5hdiA9ICh7IHJlY29yZHMsIGluZGV4ZXMsIGhlbHBlcnMgfSkgPT4gW1xuICB7XG4gICAgbmFtZTogXCJBcHBsaWNhdGlvbiBSb290XCIsXG4gICAgaW5oZXJpdHM6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvbmF2XCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIGl0ZW1zOiBpbmRleGVzLmZpbHRlcihpID0+IGkucGFyZW50KCkudHlwZSA9PT0gXCJyb290XCIpLm1hcChuYXZJdGVtKSxcbiAgICAgIHNlbGVjdGVkSXRlbToge1xuICAgICAgICBcIiMjYmJzdGF0ZVwiOiBcInNlbGVjdGVkTmF2XCIsXG4gICAgICAgIFwiIyNiYnN0YXRlZmFsbGJhY2tcIjogcmVjb3Jkc1swXS5jb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgXCIjI2Jic291cmNlXCI6IFwic3RvcmVcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLi4uaW5kZXhUYWJsZXMoeyByZWNvcmRzLCBpbmRleGVzLCBoZWxwZXJzIH0pLFxuXVxuXG5leHBvcnQgY29uc3QgbmF2SXRlbSA9IGluZGV4ID0+ICh7XG4gIHRpdGxlOiBpbmRleC5uYW1lLFxuICBjb21wb25lbnQ6IHtcbiAgICBfY29tcG9uZW50OiBgdGFibGVzLyR7aW5kZXgubmFtZX0gVGFibGVgLFxuICB9LFxufSlcbiIsImltcG9ydCB7IGZvcm1zIH0gZnJvbSBcIi4vZm9ybXNHZW5lcmF0b3JcIlxuaW1wb3J0IHsgbmF2IH0gZnJvbSBcIi4vbmF2R2VuZXJhdG9yXCJcblxuZXhwb3J0IGNvbnN0IGFwcCA9IHBhcmFtcyA9PiB7XG4gIHJldHVybiBbLi4ubmF2KHBhcmFtcyksIC4uLmZvcm1zKHBhcmFtcyldXG59XG4iLCJleHBvcnQgY29uc3QgYnV0dG9ucyA9ICgpID0+IFtcbiAge1xuICAgIG5hbWU6IFwiY29tbW9uL1ByaW1hcnkgQnV0dG9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiYSBzdHlsZWQgYnV0dG9uXCIsXG4gICAgaW5oZXJpdHM6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvYnV0dG9uXCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIHBhZGRpbmc6IFwiNXB4IDdweFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjRUVFXCIsXG4gICAgICBjb2xvcjogXCIjNUY2MzY4XCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiMjZjJmMmYyXCIsXG4gICAgICBob3ZlckNvbG9yOiBcImJsYWNrXCIsXG4gICAgICBob3ZlckJhY2tncm91bmQ6IFwiI2NjY2NjY1wiLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNvbW1vbi9TZWNvbmRhcnkgQnV0dG9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiYSBzdHlsZWQgYnV0dG9uXCIsXG4gICAgaW5oZXJpdHM6IFwiQGJ1ZGliYXNlL3N0YW5kYXJkLWNvbXBvbmVudHMvYnV0dG9uXCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIHBhZGRpbmc6IFwiNXB4IDdweFwiLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjRUVFXCIsXG4gICAgICBjb2xvcjogXCIjNUY2MzY4XCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiMjZjJmMmYyXCIsXG4gICAgICBob3ZlckNvbG9yOiBcImJsYWNrXCIsXG4gICAgICBob3ZlckJhY2tncm91bmQ6IFwiI2NjY2NjY1wiLFxuICAgIH0sXG4gIH0sXG5dXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQVksTUFBQyxPQUFPLEdBQUcsTUFBTTtBQUM3QixFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsV0FBVztBQUNyQixJQUFJLFdBQVcsRUFBRSxVQUFVO0FBQzNCLElBQUksUUFBUSxFQUFFLG9DQUFvQztBQUNsRCxJQUFJLEtBQUssRUFBRTtBQUNYLE1BQU0sSUFBSSxFQUFFLE1BQU07QUFDbEIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsV0FBVztBQUNyQixJQUFJLFdBQVcsRUFBRSxVQUFVO0FBQzNCLElBQUksUUFBUSxFQUFFLG9DQUFvQztBQUNsRCxJQUFJLEtBQUssRUFBRTtBQUNYLE1BQU0sSUFBSSxFQUFFLE1BQU07QUFDbEIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsV0FBVztBQUNyQixJQUFJLFdBQVcsRUFBRSxVQUFVO0FBQzNCLElBQUksUUFBUSxFQUFFLG9DQUFvQztBQUNsRCxJQUFJLEtBQUssRUFBRTtBQUNYLE1BQU0sSUFBSSxFQUFFLFdBQVc7QUFDdkIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsV0FBVztBQUNyQixJQUFJLFdBQVcsRUFBRSxVQUFVO0FBQzNCLElBQUksUUFBUSxFQUFFLG9DQUFvQztBQUNsRCxJQUFJLEtBQUssRUFBRTtBQUNYLE1BQU0sSUFBSSxFQUFFLFdBQVc7QUFDdkIsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUMvQlksTUFBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSztBQUMvQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEFBQW9CLENBQUM7QUFDbEMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3RCLEVBQUM7QUFDRDtBQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSztBQUN4QixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDN0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzVELEVBQUUsUUFBUSxFQUFFLDBDQUEwQztBQUN0RCxFQUFFLEtBQUssRUFBRTtBQUNULElBQUksU0FBUyxFQUFFLFVBQVU7QUFDekIsSUFBSSxRQUFRLEVBQUU7QUFDZCxNQUFNO0FBQ04sUUFBUSxPQUFPLEVBQUU7QUFDakIsVUFBVSxVQUFVLEVBQUUsV0FBVztBQUNqQyxVQUFVLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsU0FBUztBQUNULE9BQU87QUFDUCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDbEIsTUFBTSxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7QUFDL0IsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDLEVBQUM7QUFDRjtBQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSztBQUN4QixFQUFFLE9BQU8sRUFBRTtBQUNYLElBQUksVUFBVSxFQUFFLG9DQUFvQztBQUNwRCxJQUFJLFlBQVksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7QUFDMUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7QUFDcEIsTUFBTSxPQUFPLEVBQUU7QUFDZixRQUFRLFVBQVUsRUFBRSx1Q0FBdUM7QUFDM0QsUUFBUSxLQUFLLEVBQUU7QUFDZixVQUFVLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsVUFBVSxZQUFZLEVBQUUsT0FBTztBQUMvQixTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUssQ0FBQyxDQUFDO0FBQ1AsR0FBRztBQUNILENBQUMsRUFBQztBQUNGO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLEtBQUs7QUFDckMsRUFBRSxPQUFPLEVBQUU7QUFDWCxJQUFJLFVBQVUsRUFBRSwwQ0FBMEM7QUFDMUQsSUFBSSxTQUFTLEVBQUUsWUFBWTtBQUMzQixJQUFJLFFBQVEsRUFBRTtBQUNkLE1BQU0sb0JBQW9CLENBQUM7QUFDM0IsUUFBUSxVQUFVLEVBQUUsdUJBQXVCO0FBQzNDLFFBQVEsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxRQUFRLE9BQU8sRUFBRTtBQUNqQixVQUFVO0FBQ1YsWUFBWSxvQkFBb0IsRUFBRSxhQUFhO0FBQy9DLFlBQVksVUFBVSxFQUFFO0FBQ3hCLGNBQWMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPLENBQUM7QUFDUixNQUFNLG9CQUFvQixDQUFDO0FBQzNCLFFBQVEsVUFBVSxFQUFFLHlCQUF5QjtBQUM3QyxRQUFRLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUM3QixRQUFRLE9BQU8sRUFBRTtBQUNqQixVQUFVO0FBQ1YsWUFBWSxvQkFBb0IsRUFBRSxhQUFhO0FBQy9DLFlBQVksVUFBVSxFQUFFO0FBQ3hCLGNBQWMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPLENBQUM7QUFDUixLQUFLO0FBQ0wsR0FBRztBQUNILENBQUMsRUFBQztBQUNGO0FBQ0EsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLEtBQUs7QUFDeEMsRUFBRSxPQUFPLEVBQUU7QUFDWCxJQUFJLFVBQVUsRUFBRSxxQ0FBcUM7QUFDckQsSUFBSSxPQUFPLEVBQUUsTUFBTTtBQUNuQixJQUFJLFNBQVMsRUFBRSxNQUFNO0FBQ3JCLEdBQUc7QUFDSCxDQUFDLENBQUM7O0FDakZVLE1BQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2hELEVBQUUsT0FBTztBQUNULEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztBQUM1QyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBQztBQUNyQztBQUNBLEFBQU8sTUFBTSxlQUFlLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxNQUFNO0FBQ3BELEVBQUUsSUFBSSxFQUFFO0FBQ1IsSUFBSSxXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNoQyxJQUFJLFlBQVksRUFBRSxPQUFPO0FBQ3pCLEdBQUc7QUFDSCxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDakQsQ0FBQyxFQUFDO0FBQ0Y7QUFDQSxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLE1BQU07QUFDeEMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDcEMsRUFBRSxRQUFRLEVBQUUscUNBQXFDO0FBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO0FBQ3hDLENBQUMsRUFBQztBQUNGO0FBQ0EsTUFBTSxNQUFNLEdBQUcsR0FBRyxLQUFLO0FBQ3ZCLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJO0FBQ2pCLEVBQUUsS0FBSyxFQUFFO0FBQ1QsSUFBSSxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUk7QUFDekIsSUFBSSxZQUFZLEVBQUUsU0FBUztBQUMzQixHQUFHO0FBQ0gsQ0FBQyxDQUFDOztBQ3ZCVSxNQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSztBQUN0RCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsa0JBQWtCO0FBQzVCLElBQUksUUFBUSxFQUFFLG1DQUFtQztBQUNqRCxJQUFJLEtBQUssRUFBRTtBQUNYLE1BQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUN6RSxNQUFNLFlBQVksRUFBRTtBQUNwQixRQUFRLFdBQVcsRUFBRSxhQUFhO0FBQ2xDLFFBQVEsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7QUFDdEQsUUFBUSxZQUFZLEVBQUUsT0FBTztBQUM3QixPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFLEdBQUcsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUMvQyxFQUFDO0FBQ0Q7QUFDQSxBQUFPLE1BQU0sT0FBTyxHQUFHLEtBQUssS0FBSztBQUNqQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSTtBQUNuQixFQUFFLFNBQVMsRUFBRTtBQUNiLElBQUksVUFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzVDLEdBQUc7QUFDSCxDQUFDLENBQUM7O0FDcEJVLE1BQUMsR0FBRyxHQUFHLE1BQU0sSUFBSTtBQUM3QixFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxDQUFDOztBQ0xXLE1BQUMsT0FBTyxHQUFHLE1BQU07QUFDN0IsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLHVCQUF1QjtBQUNqQyxJQUFJLFdBQVcsRUFBRSxpQkFBaUI7QUFDbEMsSUFBSSxRQUFRLEVBQUUsc0NBQXNDO0FBQ3BELElBQUksS0FBSyxFQUFFO0FBQ1gsTUFBTSxPQUFPLEVBQUUsU0FBUztBQUN4QixNQUFNLE1BQU0sRUFBRSxnQkFBZ0I7QUFDOUIsTUFBTSxLQUFLLEVBQUUsU0FBUztBQUN0QixNQUFNLFVBQVUsRUFBRSxVQUFVO0FBQzVCLE1BQU0sVUFBVSxFQUFFLE9BQU87QUFDekIsTUFBTSxlQUFlLEVBQUUsU0FBUztBQUNoQyxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSx5QkFBeUI7QUFDbkMsSUFBSSxXQUFXLEVBQUUsaUJBQWlCO0FBQ2xDLElBQUksUUFBUSxFQUFFLHNDQUFzQztBQUNwRCxJQUFJLEtBQUssRUFBRTtBQUNYLE1BQU0sT0FBTyxFQUFFLFNBQVM7QUFDeEIsTUFBTSxNQUFNLEVBQUUsZ0JBQWdCO0FBQzlCLE1BQU0sS0FBSyxFQUFFLFNBQVM7QUFDdEIsTUFBTSxVQUFVLEVBQUUsVUFBVTtBQUM1QixNQUFNLFVBQVUsRUFBRSxPQUFPO0FBQ3pCLE1BQU0sZUFBZSxFQUFFLFNBQVM7QUFDaEMsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOzs7OyJ9