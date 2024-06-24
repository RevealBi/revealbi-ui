// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RevealSdkSettings, RevealViewOptions, SavingArgs, SeriesColorRequestedArgs } from '@revealbi/ui';
import { RvRevealView, RvRevealViewRef, RvDialog, RvDialogRef } from '@revealbi/ui-react';
import { useRef, useState } from 'react';
import styles from './app.module.scss';

export function App() {

  const rvRef = useRef<RvRevealViewRef>(null);
  const rvDialogRef = useRef<RvDialogRef>(null);;
  
  RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
  //RevealSdkSettings.serverUrl = "http://localhost:5111";

  const [dashboard, setDashboard] = useState<string>("Campaigns");

  const options: RevealViewOptions = {
    dataSources: [
      { type: "REST", title: "Sales by Category", subtitle: "Excel2Json", url: "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9" },
    ],
    header: {
      menu: {
        items: [
          { title: "Item 1", click: () => console.log(rvRef.current?.getRVDashboard())},
          { title: "Item 2", click: () => alert("Item 2") },
          { title: "Item 3", click: () => alert("Item 3") },
        ]
      }
    },
  }

  const footerButtonClick = () => {
    rvDialogRef.current?.close("save-button");
    console.log("Save button clicked");
  }

  const onSaving = async (args: SavingArgs) => {
    const result = await rvDialogRef.current?.show();
    if (result === "save-button") {
      args.dashboardId = args.name = result;
      args.saveFinished();
    } else {
      console.log("Save cancelled");
      return;
    }
  }

  return (
    <div style={{height: '100%'}}>
      <RvRevealView ref={rvRef} dashboard={dashboard} options={options} saving={onSaving}></RvRevealView>

      <RvDialog ref={rvDialogRef} open={true} title="Save Dashboard">
        <h1>Do you want to save this dashboard?</h1>
        <div slot="footer">
          <button className="rv-button" onClick={footerButtonClick}>Save Button</button>
        </div>
      </RvDialog>
    </div>
  );
}

export default App;
