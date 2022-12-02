import {createStore, LayerRenderStatus, Plugin, PluginOnTextLayerRender} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as React from "react";
  
interface StoreProps {
  paginaActual: number;
  rawText: Map<number, string>;
}

interface ReaderPlugin extends Plugin {
  setPaginaActual: (index: number) => void;
  store: any;
}

const readerPlugin = (): ReaderPlugin => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const store = React.useMemo(
    () =>
      createStore<StoreProps>({
        paginaActual: -1,
        rawText: new Map()
      }),
    []
  );

  const setPaginaActual = (index: number) => {
    store.update("paginaActual", index);
  };

  const onTextLayerRender = (e: PluginOnTextLayerRender) => {
    if (e.status === LayerRenderStatus.DidRender) {
      const textLayer = e.ele;
      // const rawText = textLayer.textContent;
      const textElements = [
        ...textLayer.querySelectorAll(".rpv-core__text-layer-text")
      ] as HTMLElement[];
      const rawText = textElements.map((ele) => ele.textContent).join("");

      store.updateCurrentValue("rawText", (value) =>
        value.set(e.pageIndex, rawText)
      );
    }
  };

  return {
    onTextLayerRender,
    setPaginaActual,
    store
  };
};

export default readerPlugin;