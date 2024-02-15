export type TNotification = {
  userId: string;
  message: string;
  deviceToken?: string;
  title?: TPushNotificationTitleEnum;
  body?: string;
};

export enum TPushNotificationTitleEnum {
  APPOINTMENT = "Appointment",
  MESSAGE = "Message",
  MEDICATION = "Medication",
}

export type TPushNotificationInput = {
  deviceToken: string;
  title: TPushNotificationTitleEnum;
  body: string;
};
