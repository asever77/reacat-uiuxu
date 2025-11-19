import type { Meta, StoryObj } from '@storybook/react';
import { IconShowcase } from './IconShowcase';

const meta: Meta<typeof IconShowcase> = {
  title: 'Design System/Icons',
  component: IconShowcase,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  name: 'All Icons',
  args: {},
};

export const SmallSize: Story = {
  name: 'Small Size (16px)',
  args: {
    size: 16,
  },
};

export const MediumSize: Story = {
  name: 'Medium Size (24px)',
  args: {
    size: 24,
  },
};

export const LargeSize: Story = {
  name: 'Large Size (32px)',
  args: {
    size: 32,
  },
};

export const WithColors: Story = {
  name: 'With Different Colors',
  args: {
    showColorVariants: true,
  },
};