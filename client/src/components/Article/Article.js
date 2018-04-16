import React from "react";
import formatDate from "../../utils/formatDate";

const Article = ({ _id, title, url, date, isSaved, onSave, onDelete }) => (
  <div className="card mb-3" key={_id}>
    <div className="card-body">
      <h3 className="mb-2">{title}</h3>
      <p className="text-secondary mb-4">Date {isSaved ? "saved" : "published"}: {formatDate(date)}</p>
      {onSave ? (
        <button className="btn btn-primary mr-3" onClick={onSave}><i className="fas fa-bookmark"></i> Save</button>
      ) : (
        <button className="btn btn-danger mr-3" onClick={onDelete}><i className="fas fa-trash"></i> Delete</button>
      )}
      <a href={url} target="_blank" className="btn btn-light"><i className="fas fa-globe"></i> Visit website</a>
    </div>
  </div>
);

export default Article;