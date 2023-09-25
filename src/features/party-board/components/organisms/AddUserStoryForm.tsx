import { type JSX, type ReactNode } from 'react';

import AddButton from '@root/components/atoms/TextButton';
import Field from '@root/components/atoms/Field';
import useForm from '@root/hooks/useForm';
import type Story from '@root/models/Story';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

// #region Interfaces & Types

type AddUserStoryFormValues = Pick<Story, 'storyId' | 'title'>;

interface AddUserStoryFormSubmitHandler {
  (values: AddUserStoryFormValues): void | Promise<void>;
}

interface AddUserStoryFormProps {
  onSubmit: AddUserStoryFormSubmitHandler;
}

// #endregion

// #region Utilities & Constants

function validate(stories: Story[]) {
  return function validate$(values: AddUserStoryFormValues) {
    const errors: {
      [K in keyof AddUserStoryFormValues]?: ReactNode;
    } = {};

    if (!values.title.length) {
      errors.title = 'Ticket title is required';
    }

    if (
      values.storyId &&
      stories.find(({ storyId }) => storyId === values.storyId)
    ) {
      errors.storyId = 'Ticket ID already exists';
    }

    return errors;
  };
}

const defaultValues: AddUserStoryFormValues = {
  storyId: '',
  title: '',
};

// #endregion

function AddUserStoryForm({ onSubmit }: AddUserStoryFormProps): JSX.Element {
  const { stories } = usePartyBoardContext();
  const { handleChange, handleSubmit, values, errors } =
    useForm<AddUserStoryFormValues>(defaultValues, {
      onSubmit,
      validate: validate(stories),
      resetAfterSubmit: true,
    });

  const hasTitle = !!values.title;

  return (
    <div className="flex flex-col gap-1 animate-scale-in">
      <form className="flex gap-1" onSubmit={handleSubmit()}>
        <div className="w-[220px]">
          <Field
            name="storyId"
            placeholder="e.g. PROJECT-123"
            onChange={handleChange('storyId')}
            error={errors.storyId}
          />
          <span className="text-gray-400 text-xs -mt-4">Optional</span>
        </div>
        <div className="md:w-[600px]">
          <Field
            name="title"
            placeholder="e.g. Create a story voting platform"
            onChange={handleChange('title')}
            error={errors.title}
          />
        </div>
        {hasTitle && <AddButton type="submit">Add</AddButton>}
      </form>
    </div>
  );
}

export default AddUserStoryForm;
