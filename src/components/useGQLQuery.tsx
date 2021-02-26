import React from 'react'
import { request } from 'graphql-request'
import { useQuery } from 'react-query';

export const useGQLQuery: React.FC = (key, query, variables) => {
    const endpoint = 'https://test-task.expane.pro/api/graphql';
    const fetchData = async () => await request(endpoint, query, variables)
    return useQuery(key, fetchData)
}