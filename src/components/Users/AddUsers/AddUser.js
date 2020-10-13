import { Button, CardActions, Modal } from '@material-ui/core'
import React, { Component } from 'react'
import { Form } from 'react-final-form'
import { useStyles } from './AddUser.sytles'

const AddUser = ({ classes, post, onSave, history }) => {
  
  render() {
    const classes = useStyles;
    return (
      <Form initialValues={post} onSubmit={onSave}>
      {({ handleSubmit }) => (
        <Modal
          className={classes.modal}
          onClose={() => history.goBack()}
          open
        >
          <Card className={classes.modalCard}>
            <form onSubmit={handleSubmit}>
              <CardContent className={classes.modalCardContent}>
                <Field name="title">
                  {({ input }) => <TextField label="Title" autoFocus {...input} />}
                </Field>
                <Field name="body">
                  {({ input }) => (
                    <TextField
                      className={classes.marginTop}
                      label="Body"
                      multiline
                      rows={4}
                      {...input}
                    />
                  )}
                </Field>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" type="submit">Save</Button>
                <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
              </CardActions>
            </form>
          </Card>
        </Modal>
      )}
    </Form>
    )
  }
}

export default AddUser