import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet"

import { countries } from "@/lib/data/countries";

export function CountrySelector({
  selected,
  onChange,
  showActionsheet,
  handleClose,
}: {
  selected: string;
  onChange: (value: string) => void;
  showActionsheet: boolean;
  handleClose: () => void;
}) {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Edit Message</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Mark Unread</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Remind Me</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClose}>
          <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem isDisabled onPress={handleClose}>
          <ActionsheetItemText>Delete</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}
