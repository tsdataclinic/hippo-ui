import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@hippo/button';
import { ThemeProvider } from '@hippo/theme-provider';

export default {
  component: Button,
  title: 'example/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = () => {
  return (
    <ThemeProvider
      theme={{
        paddings: {
          lg: 10,
          md: 5,
          sm: 3,
        },
      }}
    >
      <Button>Hello</Button>
    </ThemeProvider>
  );
};

export const MyExample = Template.bind({});
MyExample.args = {};
